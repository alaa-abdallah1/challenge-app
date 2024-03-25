import { AxiosError } from "axios";
import { useQuery, useMutation } from "@/hooks";
import { useSearchParams } from "react-router-dom";
import { useGlobalNotification } from "@/contexts";
import React, { useState, useEffect, useRef } from "react";
import { DataTableHeader, FormValidationState, User } from "@/types";
import { Icon, Form, Modal, Button, DataTable, InputField } from "@/components";

const validationSchema = {
  avatar: "url",
  job: "maxLength:50",
  email: "required|email",
  last_name: "required|maxLength:50",
  first_name: "required|maxLength:50",
};

const initialValues = {
  id: "",
  job: "",
  email: "",
  last_name: "",
  first_name: "",
};

const Dashboard: React.FC = () => {
  const itemsPerPage = 3;

  const [users, setUsers] = useState<User[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const [searchParams] = useSearchParams();
  const [isCreateEditModalOpen, setIsCreateEditModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  const [selectedUser, setSelectedUser] = useState<User>(initialValues);

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [totalPages, setTotalPages] = useState<number>(currentPage);
  const [isEdit, setIsEdit] = useState(false);

  const { data: fetchedUsersData, isLoading: isUsersLoading } = useQuery(
    `/users?page=${currentPage}&per_page=${itemsPerPage}`
  );

  const { mutate: createEdit, isLoading: isCreateEditLoading } = useMutation();
  const { mutate: deleteItem, isLoading: isDeleting } = useMutation();

  const { showMessage } = useGlobalNotification();

  useEffect(() => {
    if (fetchedUsersData) {
      setUsers(fetchedUsersData?.data);
      setTotalPages(fetchedUsersData?.total_pages);
    }
  }, [fetchedUsersData, currentPage]);

  const handleCreateEdit = async ({ values, isValid }: FormValidationState) => {
    if (!isValid) return;

    try {
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit ? `/users/${values?.id}` : "/users";

      const successMessage = isEdit
        ? "User updated successfully"
        : "User created successfully";

      const { data: updatedOrCreatedUser } = await createEdit({
        url,
        method,
        data: values,
      });

      if (isEdit) {
        const selectedUser = users.find(
          (user) => user?.id === updatedOrCreatedUser?.id
        );

        if (!selectedUser) return;

        Object.assign(selectedUser, { ...updatedOrCreatedUser });
      } else {
        setUsers([{ ...updatedOrCreatedUser }, ...users]);
      }

      setIsCreateEditModalOpen(false);

      showMessage({ message: successMessage });
    } catch (error: AxiosError | any) {
      showMessage({
        message:
          error.response?.data?.error || "An error occurred. Please try again.",
        type: "error",
      });
    }
  };

  const headers: DataTableHeader[] = [
    {
      key: "email",
    },
    {
      key: "first_name",
    },
    {
      key: "last_name",
    },
    {
      key: "avatar",
      skeletonClassName: "w-10 rounded-full",
      component: (item) =>
        item?.avatar ? (
          <img
            loading="lazy"
            src={item.avatar}
            alt={item.avatar}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <Icon
            name="user"
            viewBox="0 0 18 18"
            className="w-10 h-10 fill-theme dark:fill-theme"
          />
        ),
    },
    {
      key: "Actions",
      headerClassName: "text-center",
      component: (item) => (
        <div className="flex space-x-2 justify-center items-center">
          <Button
            btnType="info"
            size="small"
            className="edit-user"
            onClick={() => handleModalShowing("edit", item)}
          >
            <Icon
              name="edit"
              className="w-4 h-4 fill-none"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </Button>
          <Button
            btnType="danger"
            size="small"
            className="delete-user"
            onClick={() => onDeleteItem(item)}
          >
            <Icon
              name="delete"
              viewBox="0 0 448 512"
              className="w-4 h-4 fill-white"
            />
          </Button>
        </div>
      ),
    },
  ];

  const onDeleteItem = async (item: any) => {
    setSelectedUser({ ...item });
    setIsConfirmDeleteModalOpen(true);
  };

  const onConfirmDeleteItem = async () => {
    try {
      await deleteItem({ url: `/users/${selectedUser?.id}`, method: "DELETE" });
      setUsers(users.filter((user) => user?.id !== selectedUser?.id));
      setIsConfirmDeleteModalOpen(false);
      showMessage({ message: "User deleted successfully" });
    } catch {
      showMessage({
        message: "An error occurred. Please try again",
        type: "error",
      });
    }
  };

  const handleModalShowing = (action: "edit" | "create", item?: any) => {
    setSelectedUser({ ...initialValues });

    if (action === "edit") {
      setSelectedUser({
        ...item,
      });
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
    setIsCreateEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-between w-full">
        <h1 className="header">Users</h1>
        <Button
          btnType="primary"
          className="create-user max-w-max"
          onClick={() => handleModalShowing("create")}
        >
          Add User
        </Button>
      </div>
      <DataTable
        data={users}
        headers={headers}
        totalPages={totalPages}
        isLoading={isUsersLoading}
        itemsPerPage={itemsPerPage}
      />

      <Modal
        title="Delete User"
        isLoading={isDeleting}
        isOpen={isConfirmDeleteModalOpen}
        saveBtnText="Confirm"
        saveBtnType="danger"
        saveBtnClass="confirm-delete"
        onSave={() => onConfirmDeleteItem()}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
      >
        <span className="font-mono font-semibold">
          Are you sure you want to delete this user?
        </span>
      </Modal>

      <Modal
        isOpen={isCreateEditModalOpen}
        isLoading={isCreateEditLoading}
        title={`${isEdit ? "Edit" : "Create"} User`}
        onSave={() => formRef?.current?.submitForm()}
        onClose={() => setIsCreateEditModalOpen(false)}
      >
        <Form
          ref={formRef}
          initialValues={selectedUser}
          validationSchema={validationSchema}
          onSubmit={handleCreateEdit}
        >
          {({ values, errors, validateInput, handleChange }) => (
            <>
              <InputField
                label="first name"
                name={"first_name"}
                value={values["first_name"]}
                error={errors["first_name"]}
                onBlur={() => validateInput("first_name")}
                onChange={({ target }) =>
                  handleChange("first_name", target.value)
                }
              />
              <InputField
                label="last name"
                name={"last_name"}
                value={values["last_name"]}
                error={errors["last_name"]}
                onBlur={() => validateInput("last_name")}
                onChange={({ target }) =>
                  handleChange("last_name", target.value)
                }
              />
              <InputField
                type="email"
                label="Email"
                name={"email"}
                value={values["email"]}
                error={errors["email"]}
                onBlur={() => validateInput("email")}
                onChange={({ target }) => handleChange("email", target.value)}
              />
              <InputField
                type="text"
                label="Job"
                name={"job"}
                value={values["job"]}
                error={errors["job"]}
                onBlur={() => validateInput("job")}
                onChange={({ target }) => handleChange("job", target.value)}
              />
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard;
