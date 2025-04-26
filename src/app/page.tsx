"use client";

export default function Home() {
  const auth = async () => {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: "testemail@email.ru", password: "2222" }),
    });

    console.log("response", response);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="grid grid-cols-[1fr_3fr_1fr] gap-4">
        <div className="flex flex-col justify-center">Главная страница</div>

        <button onClick={auth}>Аторизация</button>
      </div>
    </div>
  );
}
