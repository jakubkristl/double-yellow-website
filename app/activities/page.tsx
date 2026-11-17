import ActivitiesView from "@/components/ActivitiesView";
import ClubSessions from "@/components/ClubSessions";

export const revalidate = 60;

export default function ActivitiesPage() {
  return <ActivitiesView sessions={<ClubSessions locale="bg" mode="browse" />} />;
}
