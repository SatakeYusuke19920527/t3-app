import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { Auth } from "../components/Auth";
import { Layout } from "../components/Layout";
import { api } from "../utils/api";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const createTaskQuery = api.todo.createTask.useMutation();
  const readTaskQuery = api.todo.getTasks.useQuery();
  const updateTaskQuery = api.todo.updateTask.useMutation();
  const deleteTaskQuery = api.todo.deleteTask.useMutation();
  const handleCreate = async () => {
    const data = await createTaskQuery.mutate({ title: "test", body: "test body" })
    console.log("🚀 ~ file: index.tsx:13 ~ handleClick ~ data:", data)
  }
  const handleRead = async () => {
    const data = await readTaskQuery.data
    console.log("🚀 ~ file: index.tsx:13 ~ handleClick ~ data:", data)
  }

  const handleUpdate = async () => {
    const data = await updateTaskQuery.mutate({ taskId: "clr4o7w0b0000k9akvqpnwoa5", title: "test update", body: "test body update" })
    console.log("🚀 ~ file: index.tsx:13 ~ handleClick ~ data:", data)
  }

  const handleDelete = async () => {
    const data = await deleteTaskQuery.mutate({ taskId: "clr4o7w0b0000k9akvqpnwoa5" })
    console.log("🚀 ~ file: index.tsx:13 ~ handleClick ~ data:", data)
  }

  if (!session) {
    return (
      <Layout title="Login">
        <Auth />
      </Layout>
    );
  }
  return (
    <Layout title="Todo App">
      <ArrowLeftOnRectangleIcon
        className="h-6 w-6 cursor-pointer text-blue-600"
        onClick={() => signOut()}
      />
      <p className="my-3 text-xl text-blue-600">👍Hello {session?.user?.name}</p>
      <button
        onClick={handleCreate}
      >
        create Task
      </button>
      <button
        onClick={handleRead}
      >
        create Read
      </button>
      <button
        onClick={handleUpdate}
      >
        create Update
      </button>
      <button
        onClick={handleDelete}
      >
        create Delete
      </button>
    </Layout>
  );
};

export default Home;