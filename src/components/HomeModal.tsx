"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import useResize from "@/hooks/useResize";

export function HomeModal() {
  const [open, setOpen] = useState(true);
  const isMobile = useResize(768);

useEffect(() => {
  if (sessionStorage.getItem("homeModalShown") === "true") {
    setOpen(false);
  }
}, []);
const handleClose = () => {
  sessionStorage.setItem("homeModalShown", "true");
  setOpen(false);
};
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={handleClose}>
        <DrawerContent className="mb-16">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-orange-700">
              Добре дошли в &quot;За Вечеря&quot;
            </DrawerTitle>
            <DrawerDescription>
              „За вечеря“ е нов уебсайт, който ви помага лесно да откриете
              рецепти, съобразени с вашите вкусове и предпочитания. Достатъчно е
              да отговорите на няколко кратки въпроса и ще получите подбрани
              предложения.
              <span className="mt-2">
                Платформата все още се разработва и е възможно да срещнете
                дребни несъвършенства. Благодарим ви, че сте част от началото!
              </span>
              <span className="mt-2">
                Ако забележите грешки, не се колебайте да ни сигнализирате —
                вашата обратна връзка е изключително ценна за нас.
              </span>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button
                className="inline-flex items-center gap-2 transition duration-300  bg-orange-500 mt-5 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transform hover:-translate-y-1 shadow-md"
                onClick={handleClose}
              >
                Към сайта
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-orange-700">
            Добре дошли в &quot;За Вечеря&quot;
          </DialogTitle>
          <DialogDescription>
            „За вечеря“ е нов уебсайт, който ви помага лесно да откриете
            рецепти, съобразени с вашите вкусове и предпочитания. Достатъчно е
            да отговорите на няколко кратки въпроса и ще получите подбрани
            предложения.
            <span className="mt-2">
              Платформата все още се разработва и е възможно да срещнете дребни
              несъвършенства. Благодарим ви, че сте част от началото!
            </span>
            <span className="mt-2">
              Ако забележите грешки, не се колебайте да ни сигнализирате —
              вашата обратна връзка е изключително ценна за нас.
            </span>
          </DialogDescription>
        </DialogHeader>
        <Button
          className="inline-flex items-center gap-2 transition duration-300  bg-orange-500 mt-5 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transform hover:-translate-y-1 shadow-md"
          onClick={handleClose}
        >
          Към сайта
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default HomeModal;
