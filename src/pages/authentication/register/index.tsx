import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Textlib } from "../../../components/text";
import { InputLib } from "../../../components/Input";
import { ButtonLib } from "../../../components/button";


export const Register = () => {
  const navigate = useNavigate();

   const goToLogin = () => {
    navigate("/");
  };

  return (
    <>
      <Helmet title="Papo com | Cadastro" />

      <form className="animate-slide-in-right">
        <div className="flex flex-col items-start gap-5 mb-5">
          <Textlib as="span" color="default" size="xl">
            Criar Conta
          </Textlib>
        </div>

        <div className="flex flex-col gap-5 w-full">
          <div>
            <Textlib as="label" color="default">
              Nome de Usuario
            </Textlib>

            <InputLib variant="default" inputSize="small" className="" />
          </div>

          <div>
            <Textlib as="label" color="default">
              E-mail
            </Textlib>

            <InputLib variant="default" inputSize="small" />
          </div>

          <div>
            <Textlib as="label" color="default">
              Senha
            </Textlib>

            <InputLib
              variant="default"
              inputSize="small"
              isPassword={true}
              maxLength={8}
            />
          </div>

          <div>
            <Textlib as="span" color="default">
              Confirmar Senha
            </Textlib>

            <InputLib
              variant="default"
              inputSize="small"
              isPassword={true}
              maxLength={8}
            />
          </div>

          <ButtonLib
            variant="primary"
            textColor="secondary"
            size="small"
            type="submit"
          >
            Cadastrar
          </ButtonLib>

          <div className="flex flex-col gap-2">
            <Textlib as="span" color="muted" size="sm">
              Já tem Conta?
            </Textlib>

            <ButtonLib
              variant="accent"
              textColor="primary"
              size="small"
              type="button"
              onClick={goToLogin}
            >
              Acessar
            </ButtonLib>
          </div>
        </div>
      </form>
    </>
  );
};
