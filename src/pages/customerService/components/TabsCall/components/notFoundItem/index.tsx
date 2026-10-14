import { MessageCircleOff } from "lucide-react";
import { CardLib } from "../../../../../../components/card";
import { Textlib } from "../../../../../../components/text";
import { ButtonLib } from "../../../../../../components/button";

export const NotFoundItem = () => {
  return (
    <CardLib
      width="full"
      height="full"
      colorBackeGround="muted"
      className="flex flex-col justify-center items-center gap-5"
    >
      <div className="flex flex-col justify-center text-center items-center gap-5">
        <CardLib
          width="fit"
          height="full"
          rounded="full"
          padding="md"
          colorBackeGround="muted"
          className="flex flex-col justify-center items-center gap-2"
        >
          <MessageCircleOff color="#144F44" size={90} />
        </CardLib>

        <Textlib color="primary" size="3xl" className="font-semibold">
          Nenhum resultado encontrado!
        </Textlib>
        <Textlib color="primary" size="md" className="font-semibold w-105 break-keep">
          Não encontramos nada correspondente a sua busca. Tente ajustar a busca ou os filtros.
        </Textlib>
      </div>
      <CardLib
        width="6xl"
        height="fit"
        rounded="md"
        padding="md"
        colorBackeGround="primary"
        className="flex flex-col justify-start items-start gap-2"
      >
        <Textlib color="secondary" size="lg" className="font-semibold">
          Sugestões:
        </Textlib>
        <div>
          <ol>
            <li className="flex gap-2">
              <Textlib
                as="span"
                color="accent"
                size="md"
                className="font-semibold"
              >
                1
              </Textlib>
              <Textlib
                as="span"
                color="secondary"
                size="md"
                className="font-semibold"
              >
                Verifique se há erros de digitação
              </Textlib>
            </li>
            <li className="flex gap-2">
              <Textlib
                as="span"
                color="accent"
                size="md"
                className="font-semibold"
              >
                2 
              </Textlib>
              <Textlib
                as="span"
                color="secondary"
                size="md"
                className="font-semibold"
              >
                Remova filtros para ampliar o resultado
              </Textlib>
            </li>
            <li className="flex gap-2">
              <Textlib
                as="span"
                color="accent"
                size="md"
                className="font-semibold"
              >
                3
              </Textlib>
              <Textlib
                as="span"
                color="secondary"
                size="md"
                className="font-semibold"
              >
                Use menos palavras ou termos mais gerais
              </Textlib>
            </li>
          </ol>
        </div>
      </CardLib>
      <div className="flex flex-row justify-between  items-center gap-10 w-96">
        <ButtonLib size="large" colorBackeGround="accent" colorBackeHouverGround="none" textColor="primary">Limpar Filtros e Campo de busca</ButtonLib>
      </div>
    </CardLib>
  );
};
