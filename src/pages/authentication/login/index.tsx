import { useNavigate } from "react-router-dom";
import { Textlib } from "../../../components/text";
import { InputLib } from "../../../components/Input";
import { ButtonLib } from "../../../components/button";

export const Login = () => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/cadastro");
  };

  return (
    <form>
      <div className="flex flex-col items-start gap-5 animate-slide-in-right">
        <div className="flex flex-col items-center gap-5">
          <Textlib as="span" color="default" size="xl">
            Entrar na plataforma
          </Textlib>
        </div>
        <div className="flex flex-col items-center gap-5">
          <Textlib as="span" color="primary" size="md">
            Use seu e-mail corporativo e senha para acessar.
          </Textlib>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <div>
            <Textlib as="label" color="default">
              E-mail
            </Textlib>
            <InputLib variant="default" inputSize="small" />
          </div>

          <div>
            <Textlib as="p" color="default">
              Senha
            </Textlib>
            <InputLib
              variant="default"
              inputSize="small"
              maxLength={8}
              isPassword={true}
            />
          </div>
        </div>
        <ButtonLib
          colorBackeGround="primary"
          size="median"
          shadow="default"
          type="submit"
        >
          <Textlib size="md" color="secondary">
            Entrar
          </Textlib>
        </ButtonLib>

        <div className="flex flex-col gap-2 w-full">
          <Textlib as="span" color="primary" size="sm">
            Não tem conta?
          </Textlib>
          <ButtonLib
            colorBackeGround="accent"
            colorBackeHouverGround="muted"
            textColor="primary"
            size="median"
            type="button"
            shadow="default"
            onClick={goToRegister}
          >
            Criar conta
          </ButtonLib>
        </div>
      </div>
    </form>
  );
};
