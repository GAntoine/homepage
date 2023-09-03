import { useTranslation } from "next-i18next";

import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

function UserComponent({ widget, fields }) {
  const { t } = useTranslation();

  const { data, error } = useWidgetAPI(widget, "user");

  if (error) {
    return null;
  }

  const showFollowers = fields.includes("followers");
  const showFollowing = fields.includes("following");

  if (!data) {
    return (
      <>
        {showFollowers && <Block key="followers" label="gitea.followers" />}
        {showFollowing && <Block key="following" label="gitea.following" />}
      </>
    );
  }

  return (
    <>
      {showFollowers && (
        <Block key="followers" label="gitea.followers" value={t("common.number", { value: data.followers_count })} />
      )}
      {showFollowing && (
        <Block key="following" label="gitea.following" value={t("common.number", { value: data.following_count })} />
      )}
    </>
  );
}

function RepoComponent({ widget, fields }) {
  const { t } = useTranslation();

  const { data, error } = useWidgetAPI(widget, "repos");

  if (error) {
    return null;
  }

  const showRepos = fields.includes("repos");
  const showStars = fields.includes("stars");
  const showForks = fields.includes("forks");

  if (!data) {
    return (
      <>
        {showRepos && <Block key="repos" label="gitea.repos" />}
        {showStars && <Block key="stars" label="gitea.stars" />}
        {showForks && <Block key="forks" label="gitea.forks" />}
      </>
    );
  }

  const repoStats = data.reduce(
    (acc, repo) => {
      acc.repos += 1;
      acc.stars += repo.stars_count;
      acc.forks += repo.forks_count;
      return acc;
    },
    { repos: 0, stars: 0, forks: 0 }
  );

  return (
    <>
      {showRepos && <Block key="repos" label="gitea.repos" value={t("common.number", { value: repoStats.repos })} />}
      {showStars && <Block key="stars" label="gitea.stars" value={t("common.number", { value: repoStats.stars })} />}
      {showForks && <Block key="forks" label="gitea.forks" value={t("common.number", { value: repoStats.forks })} />}
    </>
  );
}

function NotificationsComponent({ widget, fields }) {
  const { t } = useTranslation();

  const { data, error } = useWidgetAPI(widget, "notifications");

  if (error) {
    return null;
  }

  const showNotifications = fields.includes("notifications");
  const showIssue = fields.includes("issue");
  const showPull = fields.includes("pull");
  const showCommit = fields.includes("commit");
  const showRepository = fields.includes("repository");

  if (!data) {
    return (
      <>
        {showNotifications && <Block key="notifications" label="gitea.notifications" />}
        {showIssue && <Block key="issue" label="gitea.issue" />}
        {showPull && <Block key="pull" label="gitea.pull" />}
        {showCommit && <Block key="commit" label="gitea.commit" />}
        {showRepository && <Block key="repository" label="gitea.repository" />}
      </>
    );
  }

  const notificationTypes = data.reduce(
    (acc, notification) => {
      acc[notification.subject.type.toLowerCase()] += 1;
      acc.notifications += 1;
      return acc;
    },
    {
      notifications: 0,
      issue: 0,
      pull: 0,
      commit: 0,
      repository: 0,
    }
  );

  return (
    <>
      {showNotifications && (
        <Block
          key="notifications"
          label="gitea.notifications"
          value={t("common.number", { value: notificationTypes.notifications })}
        />
      )}
      {showIssue && (
        <Block key="issue" label="gitea.issue" value={t("common.number", { value: notificationTypes.issue })} />
      )}
      {showPull && (
        <Block key="pull" label="gitea.pull" value={t("common.number", { value: notificationTypes.pull })} />
      )}
      {showCommit && (
        <Block key="commit" label="gitea.commit" value={t("common.number", { value: notificationTypes.commit })} />
      )}
      {showRepository && (
        <Block
          key="repository"
          label="gitea.repository"
          value={t("common.number", { value: notificationTypes.repository })}
        />
      )}
    </>
  );
}

export default function Component({ service }) {
  const { widget } = service;
  const fields = widget.fields ?? ["repos", "followers", "notifications"];

  // Different fields require different API calls
  const userFields = ["followers", "following"];
  const repoFields = ["repos", "stars", "forks"];
  const notificationFields = ["notifications", "issue", "pull", "commit", "repository"];

  const hasUserFields = fields.some((field) => userFields.includes(field));
  const hasRepoFields = fields.some((field) => repoFields.includes(field));
  const hasNotificationFields = fields.some((field) => notificationFields.includes(field));

  return (
    <Container service={service}>
      {hasUserFields && <UserComponent label="gitea.followers" widget={widget} fields={fields} />}
      {hasRepoFields && <RepoComponent label="gitea.repos" widget={widget} fields={fields} />}
      {hasNotificationFields && <NotificationsComponent label="gitea.notifications" widget={widget} fields={fields} />}
    </Container>
  );
}
