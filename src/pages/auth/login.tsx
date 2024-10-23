import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { AuthLoginForm } from "../../utils";
import { useMutation } from "@tanstack/react-query";
import { LOGIN_USER } from "../../utils/api/authApi";
import { useAuthStore } from "../../store";
import { toast } from "react-toastify";

// Define the schema using Zod
const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .nonempty({ message: "Password required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

const Login = () => {
  const navigator = useNavigate();
  const { setToken } = useAuthStore((state) => state);
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: AuthLoginForm) => LOGIN_USER(data),
    onSuccess: (data) => {
      setToken(data.token);
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigator("/");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
  });

  const onSubmit = (data: LoginSchema) => {
    mutate(data);
    console.log(data); // Handle login logic here
  };
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div>
      <div
        className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=1623&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        <div className="rounded-xl bg-gray-800 bg-opacity-50 w-[500px] px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <img
                src="../../src/assets/images/football.png"
                width={80}
                alt="Football CMS"
              />
              <h1 className="mb-2 text-2xl">Football CMS</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4  text-lg">
                <Input
                  isRequired
                  autoComplete="off"
                  type="email"
                  radius="md"
                  label="Email"
                  isInvalid={errors.email?.message ? true : false}
                  errorMessage={errors.email?.message}
                  {...register("email")}
                />
              </div>
              <div className="mb-6 text-lg">
                <Input
                  type={isVisible ? "text" : "password"}
                  radius="md"
                  label="Password"
                  autoComplete="off"
                  isInvalid={errors.password?.message ? true : false}
                  errorMessage={errors.password?.message}
                  {...register("password")}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="toggle password visibility"
                    >
                      {isVisible ? (
                        <EyeClosed className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <Eye className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <Button
                  isDisabled={isPending}
                  isLoading={isPending}
                  type="submit"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
