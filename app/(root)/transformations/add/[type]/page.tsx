import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AddTransformationTypePage = async ({
  params: { type },
}: SearchParamProps) => {
  const { userId } = auth();
  const transformation = transformationTypes[type];

  if (!userId) redirect("/sign-in");

  try {
    const user = await getUserById(userId);

    if (!user) {
      console.error("User not found");
      // Handle the case where the user is not found
      // You might want to redirect to an error page or show a message
      return <div>User not found. Please try logging in again.</div>;
    }

    return (
      <>
        <Header
          title={transformation.title}
          subtitle={transformation.subTitle}
        />

        <section className="mt-10">
          <TransformationForm
            action="Add"
            userId={user._id}
            type={transformation.type as TransformationTypeKey}
            creditBalance={user.creditBalance}
          />
        </section>
      </>
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    // Handle any other errors that might occur
    return <div>An error occurred. Please try again later.</div>;
  }
};

export default AddTransformationTypePage;
