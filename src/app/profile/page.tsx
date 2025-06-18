"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputFieldUi } from "@/components/ui/InputFieldUi";
import { ButtonUi } from "@/components/ui/ButtonUi";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AvatarUpload } from "@/components/ui/AvatarUpload";
// import { ConnectedAccounts } from "@/components/feature/ConnectedAccounts/ConnectedAccounts";
import { useLoaderStore } from "@/store/useLoaderStore";
import { useRouter } from "next/navigation";
import { deleteItem } from "@/services/deleteItem";
import { useUserStore } from "@/store/userStore";
import { getSingleData } from "@/services/getSingleData";
import { ProfileFormData, UserI } from "@/utils/types";
import { updateProfile } from "@/services/updateProfile";

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  // const [connectedAccounts] = useState<ConnectedAccount[]>([
  //   {
  //     id: "1",
  //     type: "vk",
  //     connected: true,
  //     username: "Ярополк Иванов",
  //   },
  //   {
  //     id: "2",
  //     type: "google",
  //     connected: false,
  //   },
  // ]);
  const [formChanged, setFormChanged] = useState(false);

  const { user, setUser } = useUserStore();
  const { startLoading, stopLoading } = useLoaderStore();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>();

  const onSubmit = async (data: ProfileFormData) => {
    // Логика сохранения данных профиля

    const response = await updateProfile(data);

    if (response?.success && response?.data) {
      setUser(response.data as UserI);
    }

    setFormChanged(false);

    // Сброс состояния формы и флага изменений
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        setFormChanged(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Вы уверены, что хотите удалить свой аккаунт? Это действие необратимо."
      )
    ) {
      // Логика удаления аккаунта

      deleteItem({
        endpoint: "api/гыук",
        onSuccess: () => {
          router.push("/login");
        },
        loaderMethods: {
          startLoading: startLoading,
          stopLoading: stopLoading,
        },
        successMessage: "Аккаунт успешно деактивирован",
        errorMessage: "Не удалось деактивировать аккаунт",
      });
    }
  };

  const watchFields = watch();

  useEffect(() => {
    if (isDirty) {
      setFormChanged(true);
    }
  }, [watchFields, isDirty]);

  useEffect(() => {
    getSingleData<UserI>(`api/user/profile`, setUser, {
      startLoading,
      stopLoading,
    });
  }, []);
  useEffect(() => {
    if (user) reset(user);
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 dark:from-gray-900 dark:to-gray-800 md:bg-none md:bg-white md:dark:bg-gray-900">
      <div className="pt-[70px] md:pt-0 px-6 max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-[0_4px_8px_0_rgba(229,231,235,0.5)] dark:shadow-[0_4px_8px_0_rgba(0,0,0,0.25)] p-8 pt-5 pb-5">
          {/* Заголовок только для десктопа */}
          <h1 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white hidden md:block">
            Настройка аккаунта
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 md:space-y-8"
          >
            {/* Секция с фото и переключателем темы (только для десктопа) */}
            <div className="flex justify-between items-start">
              <AvatarUpload
                profileImage={profileImage}
                onImageChange={handleImageChange}
                size={24}
              />
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="mb-2 md:mb-0">
                <InputFieldUi
                  label="Имя"
                  {...register("firstName", { required: "Имя обязательно" })}
                  error={errors.firstName?.message}
                />
              </div>

              <div className="mb-2 md:mb-0">
                <InputFieldUi
                  label="Фамилия"
                  {...register("lastName", { required: "Фамилия обязательна" })}
                  error={errors.lastName?.message}
                />
              </div>

              <div className="mb-2 md:mb-0 order-3 md:order-none">
                <InputFieldUi
                  label="Имя аккаунта"
                  {...register("username", {
                    required: "Имя аккаунта обязательно",
                  })}
                  error={errors.username?.message}
                />
              </div>

              <div className="mb-2 md:mb-0 order-4 md:order-none">
                <InputFieldUi
                  label="Email"
                  type="email"
                  {...register("email", {
                    required: "Email обязателен",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Некорректный email",
                    },
                  })}
                  error={errors.email?.message}
                />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                Пароль
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="mb-2 md:mb-0">
                  <InputFieldUi
                    label="Существующий пароль"
                    type="password"
                    {...register("currentPassword", {
                      required: watch("newPassword")
                        ? "Обязательное поле"
                        : false,
                    })}
                    error={errors.currentPassword?.message}
                  />
                </div>

                <div className="hidden md:block" />

                <div className="mb-2 md:mb-0">
                  <InputFieldUi
                    label="Новый пароль"
                    type="password"
                    {...register("newPassword", {
                      minLength: {
                        value: 6,
                        message: "Пароль должен содержать минимум 6 символов",
                      },
                    })}
                    error={errors.newPassword?.message}
                  />
                </div>

                <div className="mb-2 md:mb-0">
                  <InputFieldUi
                    label="Повторите пароль"
                    type="password"
                    {...register("confirmPassword", {
                      validate: (value) =>
                        value === watch("newPassword") || "Пароли не совпадают",
                    })}
                    error={errors.confirmPassword?.message}
                  />
                </div>
              </div>
            </div>

            {/* Подключенные аккаунты - только для десктопа, используя компонент ConnectedAccounts */}
            {/* TODO - идея для развития */}
            {/* <ConnectedAccounts
              accounts={connectedAccounts}
              onConnect={handleConnectAccount}
              showHeader={true}
              className="hidden md:block"
            /> */}

            {/* Переключатель темы для мобильных устройств */}
            <div className="md:hidden flex items-center justify-start">
              <ThemeToggle />
            </div>

            {/* Кнопки действий - только для десктопа */}
            <div className="hidden md:flex md:justify-between md:items-center">
              <ButtonUi
                type="button"
                onClick={handleDeleteAccount}
                label="Удалить аккаунт"
                variant="link"
                size="sm"
              />

              <div className="flex space-x-4">
                {formChanged && (
                  <ButtonUi variant="primary" type="submit" label="Сохранить" />
                )}
              </div>
            </div>

            {/* Кнопка Сохранить на мобильном - в нижней части формы, видима только при изменениях */}
            {formChanged && (
              <div className="md:hidden mt-8">
                <ButtonUi
                  variant="primary"
                  type="submit"
                  label="Сохранить"
                  className="w-full"
                />
              </div>
            )}
          </form>
        </div>

        {/* Подключенные аккаунты - только для мобильных устройств */}
        {/* TODO - идея для развития */}
        {/* <ConnectedAccounts
          accounts={connectedAccounts}
          onConnect={handleConnectAccount}
          showHeader={false}
          className="mt-10 md:hidden"
        /> */}

        {/* Кнопка удаления аккаунта - только для мобильных устройств */}
        <div className="flex justify-center md:hidden mt-10">
          <ButtonUi
            type="button"
            onClick={handleDeleteAccount}
            label="Удалить аккаунт"
            variant="link"
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
