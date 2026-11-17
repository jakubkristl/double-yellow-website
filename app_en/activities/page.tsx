import ActivitiesViewEn from "@/components/ActivitiesViewEn";
import ClubSessions from "@/components/ClubSessions";

export const revalidate = 60;

export default function ActivitiesPage() {
  return <ActivitiesViewEn sessions={<ClubSessions locale="en" mode="browse" />} />;
}
