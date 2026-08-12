import { Outlet } from "react-router-dom";
import { CircleCheck, MessageCircleCheck } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Textlib } from "../../components/text";
import { CardLib } from "../../components/card";

export const HomePage = () => {
  return (
    <>
      <Helmet title="Login" />
      <div className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">
        <div className="hidden lg:block absolute lef-10 top-0 w-1/2 h-full animate-slide-in-left">
          <div
            className="hidden
                    lg:flex
                    flex-row
                    justify-start
                    items-start
                    text-center
                    gap-5
                    pt-20
                    pl-10
                    relative
                    z-10
                    animate-slide-in-left"
          >
            <CardLib padding="min" variant="accent">
                <MessageCircleCheck size={24} />
            </CardLib>
            <Textlib as="h1" color="secondary" size="4xl">
              Papo Com
            </Textlib>
          </div>
          <div className="absolute inset-0 bg-primary" />
        </div>
        <div
          className="hidden
                    lg:flex
                    flex-col
                    justify-center
                    items-start
                    text-center
                    gap-30
                    px-10
                    relative
                    z-10
                    w-1/2
                    animate-slide-in-left"
        >
          <div className="flex flex-col items-start gap-2">
            <Textlib as="h1" color="secondary" size="4xl">
              Todo o atendimento do
            </Textlib>
            <Textlib as="h1" color="secondary" size="4xl">
              WhatsApp em um só painel.
            </Textlib>
          </div>

          <div className="flex flex-col gap-4 items-start">
            <div className="flex items-center gap-2 justify-center">
              <CircleCheck className="text-accent" size="20" />
              <Textlib as="span" color="secondary" size="lg">
                Distribuição automática por fila
              </Textlib>
            </div>

            <div className="flex items-center gap-2 justify-center">
              <CircleCheck className="text-accent" size="20" />
              <Textlib as="span" color="secondary" size="lg">
                Trilha de auditoria das ações críticas
              </Textlib>
            </div>

            <div className="flex items-center gap-2 justify-center">
              <CircleCheck className="text-accent" size="20" />
              <Textlib as="span" color="secondary" size="lg">
                Um atendente por conversa, sem conflito
              </Textlib>
            </div>
          </div>
        </div>

        <div
          className="
          w-full
          lg:w-1/2
          flex
          items-center
          justify-center
          p-5
          relative
          z-10
        "
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};
