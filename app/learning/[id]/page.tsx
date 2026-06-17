import LearningPage from "@/app/learning/[id]/learnig";

export default async function Page({ params, }: { params: { id: string } }) {
    const { id } = await params;
    return <LearningPage id={id} />
}