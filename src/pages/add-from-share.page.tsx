import { useCurrentUser } from "@/entities/user/model/use-current-user";
import { PageLoader } from "@/shared/ui/page-loader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function AddFromSharePage() {
  const [data, setData] = useState<any>(null);
  const { data: user, isLoading } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("data");

    if (!raw) {
      navigate("/");
      return;
    }

    try {
      const parsed = JSON.parse(decodeURIComponent(raw));
      setData(parsed);
    } catch (e) {
      console.error("Invalid share data", e);
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login", {
        state: { from: "/add-from-share" },
      });
    }
  }, [user, isLoading, navigate]);

  if (!data || isLoading) return <PageLoader />;

  return (
    <div>
      <h1>Share Debug</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default AddFromSharePage;
