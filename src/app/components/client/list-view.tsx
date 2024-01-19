// list-view.tsx
"use client";
import type { INCharacter, IDPayload } from "@types";

import { useContext, useEffect, useRef } from "react";

import { clsx } from "clsx";
import Image from "next/image";
import { RMContext, AuthContext } from "@state";
import {
  ALoadChars,
  AUnloadChars,
  ADecorateChars,
  AAddToFavoriteChars,
} from "@actions";
import { navigate, addToFavorites, getChars } from "@gateway";

import styles from "@styles/list.module.css";
import icons from "@styles/components/icons.module.css";

// to-do: character type annotations
interface VCharactersListProps {
  characters: INCharacter[];
}

type VListProps = VCharactersListProps;

export const VList = ({ characters }: VListProps) => {
  const rmContext = useContext(RMContext);
  const { authd, email } = useContext(AuthContext);
  const [isCharsLoaded, loadChars] = ALoadChars({});
  const [, decChars] = ADecorateChars({});
  const [, unloadChars] = AUnloadChars({});
  const [, favChar] = AAddToFavoriteChars({});
  const initd = useRef(false);

  const { characters: chars }: { characters?: INCharacter[] } = rmContext;

  const dispatchAddToFavorites = async (cid?: number) => {
    const func = async (payload: IDPayload) => {
      await addToFavorites(payload);
      const op_2 = await getChars();
      loadChars({ characters: op_2 });
    };
    favChar({ email, cid }, func);
  };

  useEffect(() => {
    if (authd && characters && !isCharsLoaded && !initd.current) {
      loadChars({
        characters: characters as INCharacter[],
      });
      initd.current = true;
    }
  }, [characters, isCharsLoaded, loadChars, authd]);

  useEffect(() => {
    if (authd && isCharsLoaded) {
      decChars({ action: {} });

      return () => {
        // to-do decorate clean up
      };
    }
  }, [isCharsLoaded, authd]);

  useEffect(() => {
    if (!isCharsLoaded) return;
    return () => {
      unloadChars();
    };
  }, []);

  if (!authd || !characters) return;

  if (!isCharsLoaded && !characters) return <span>Loading...</span>;

  if (authd) {
    return (
      <article className={styles.list}>
        {chars?.map((char, i) => {
          const heartButton = clsx({
            [styles.list__fav]: true,
            [styles.list__fav__is]: char?.favorite,
          });
          return (
            <div className={styles.list__card} key={`${char?.name}--${i}`}>
              <div className={styles.list__image}>
                <Image
                  alt={`list__character__${char?.name}--image`}
                  width={300}
                  height={300}
                  className={styles.list__image__asset}
                  src={char?.image}
                />
              </div>
              <div className={styles.list__meta}>
                <div>
                  <h2>{char?.name}</h2>
                  <span>{char?.status}</span>
                  <div>
                    <h3>Last known location:</h3>
                    <span>{char?.location?.name}</span>
                  </div>
                  <div>
                    <h3>First seen in:</h3>
                    <span>{char?.origin?.name}</span>
                  </div>
                </div>
              </div>
              <button
                className={heartButton}
                onClick={() => {
                  dispatchAddToFavorites(char?.id);
                }}
              >
                <div className={icons.heart} />
              </button>
            </div>
          );
        })}
      </article>
    );
  }

  return <button onClick={() => navigate("/api/auth/signin")}>Sign in</button>;
};
