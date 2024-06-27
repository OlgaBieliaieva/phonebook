import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import Workspace from "../../components/Workspace/Workspace";

export default function Home() {
  return (
    <>
      <SideBar />
      <Workspace>
        <Outlet />
      </Workspace>
    </>
  );
}
