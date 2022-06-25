import { DefaultUi, Player, Youtube } from "@vime/react";
import {
  CaretRight,
  DiscordLogo,
  FileArrowDown,
  Lightning,
} from "phosphor-react";
import "@vime/core/themes/default.css";
import { useGetLessonBySlugQuery } from "../graphql/generated";




interface VideoProps {
  lessonSlug: string;
}

export function Video({ lessonSlug }: VideoProps) {
  const { data } = useGetLessonBySlugQuery(
    {
      variables: {
        slug: lessonSlug,
      },
    }
  );

  if (!data || !data.lesson) {
    return (
      <div className="flex-1">
        <span>Carregando...</span>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>
      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{data.lesson.title}</h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              {data.lesson.description}
            </p>
            {data.lesson.teacher && (
              <div className="flex items-center gap-4 mt-6">
              <img
                className="h-16 w-16 rounded-full border-2 border-blue"
                src={data.lesson.teacher.avatarURL}
                alt=""
              />
              <div className="leading-relaxed">
                <strong className="text-gray-200 text-2xl block ">
                  {data.lesson.teacher.name}
                </strong>
                <span className="text-gray-200 text-sm block">
                  {data.lesson.teacher.bio}
                </span>
              </div>
            </div>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <a
              href=""
              className="hover:bg-green-700 transition-colors p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center"
            >
              <DiscordLogo size={24} />
              Comunidade do Discord
            </a>
            <a
              href=""
              className="hover:bg-blue-500 hover:text-gray-900 transition-colors p-4 text-sm flex border border-blue-500 text-blue-500 items-center rounded font-bold uppercase gap-2 justify-center"
            >
              <Lightning size={24} />
              Acesse o desafio
            </a>
          </div>
        </div>

        <div className="gap-8 mt-20 grid grid-cols-2">
          <a
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
            href=""
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong>Material completamentar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material completamentar para acelerar o seu
                desenvolvimento
              </p>
            </div>
            <div className="h-full p-6 items-center flex">
              <CaretRight size={24} />
            </div>
          </a>
          <a
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
            href=""
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong>Wallpaper exclusivos</strong>
              <p className="text-sm text-gray-200 mt-2">
                Baixe wallpaper exclusivos do Ignite Lab e personalize a sua
                máquina
              </p>
            </div>
            <div className="h-full p-6 items-center flex">
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}