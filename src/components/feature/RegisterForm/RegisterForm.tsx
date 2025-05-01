'use client'

import { useForm } from 'react-hook-form'
import { FormWrapper } from '@/components/shared/FormWrapper/FormWrapper'
import { InputFieldUi } from '@/components/ui/InputFieldUi'
import { RegisterFormDataType } from '@/utils/types/types'

export const RegisterForm = ({
  onSubmit,
}: {
  onSubmit:  (data: RegisterFormDataType) => Promise<void>
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormDataType>()

  return (
    <FormWrapper
      title="Регистрация"
      btnTitle="Зарегистрироваться"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputFieldUi
          label="Имя"
          {...register('firstName', { required: 'Обязательное поле' })}
          error={errors.firstName?.message}
        />
        <InputFieldUi
          label="Фамилия"
          {...register('lastName', { required: 'Обязательное поле' })}
          error={errors.lastName?.message}
        />
      </div>
      
      <InputFieldUi
        label="Email"
        type="email"
        {...register('email', { 
          required: 'Обязательное поле',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Некорректный email'
          }
        })}
        error={errors.email?.message}
      />
      
      <InputFieldUi
        label="Имя аккаунта"
        {...register('username', { 
          required: 'Обязательное поле',
          minLength: {
            value: 3,
            message: 'Минимум 3 символа'
          }
        })}
        error={errors.username?.message}
      />
      
      <InputFieldUi
        label="Придумайте пароль"
        type="password"
        {...register('password', { 
          required: 'Обязательное поле',
          minLength: {
            value: 6,
            message: 'Минимум 6 символов'
          }
        })}
        error={errors.password?.message}
      />
      
      <InputFieldUi
        label="Повторите пароль"
        type="password"
        {...register('confirmPassword', {
          validate: (value) => 
            value === watch('password') || 'Пароли не совпадают'
        })}
        error={errors.confirmPassword?.message}
      />
    </FormWrapper>
  )
}