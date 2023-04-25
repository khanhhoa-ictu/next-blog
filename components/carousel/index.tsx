import React, { useEffect } from "react";
import Image from "next/image";
const Carouse = () => {
  useEffect(() => {
    const galleryContainer: any = document.querySelector(".gallery-container");
    const galleryControlsContainer: any =
      document.querySelector(".gallery-controls");
    const galleryControls: any = ["previous", "next"];
    const galleryItems: any = document.querySelectorAll(".gallery-item");
    class Carousel {
      carouselContainer: any;
      carouselControls: any;
      carouselArray: any[];
      constructor(container: any, items: any, controls: any) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
      }

      // Assign initial css classes for gallery and nav items
      setInitialState() {
        this.carouselArray[0].classList.add("gallery-item-first");
        this.carouselArray[1].classList.add("gallery-item-previous");
        this.carouselArray[2].classList.add("gallery-item-selected");
        this.carouselArray[3].classList.add("gallery-item-next");
        this.carouselArray[4].classList.add("gallery-item-last");
        const first = document.querySelector(".gallery-nav") as HTMLElement;
        const previous = document.querySelector(".gallery-nav") as HTMLElement;
        const selected = document.querySelector(".gallery-nav") as HTMLElement;
        const next = document.querySelector(".gallery-nav") as HTMLElement;
        const last = document.querySelector(".gallery-nav") as HTMLElement;
        first.children[0].className = "gallery-nav-item gallery-item-first";
        previous.children[1].className =
          "gallery-nav-item gallery-item-previous";
        selected.children[2].className =
          "gallery-nav-item gallery-item-selected";
        next.children[3].className = "gallery-nav-item gallery-item-next";
        last.children[4].className = "gallery-nav-item gallery-item-last";
      }

      // Update the order state of the carousel with css classes
      setCurrentState(
        target: any,
        selected: any,
        previous: any,
        next: any,
        first: any,
        last: any
      ) {
        selected.forEach((el: any) => {
          el.classList.remove("gallery-item-selected");

          if (target.className === "gallery-controls-previous") {
            el.classList.add("gallery-item-next");
          } else {
            el.classList.add("gallery-item-previous");
          }
        });

        previous.forEach((el: any) => {
          el.classList.remove("gallery-item-previous");

          if (target.className === "gallery-controls-previous") {
            el.classList.add("gallery-item-selected");
          } else {
            el.classList.add("gallery-item-first");
          }
        });

        next.forEach((el: any) => {
          el.classList.remove("gallery-item-next");

          if (target.className === "gallery-controls-previous") {
            el.classList.add("gallery-item-last");
          } else {
            el.classList.add("gallery-item-selected");
          }
        });

        first.forEach((el: any) => {
          el.classList.remove("gallery-item-first");

          if (target.className === "gallery-controls-previous") {
            el.classList.add("gallery-item-previous");
          } else {
            el.classList.add("gallery-item-last");
          }
        });

        last.forEach((el: any) => {
          el.classList.remove("gallery-item-last");

          if (target.className === "gallery-controls-previous") {
            el.classList.add("gallery-item-first");
          } else {
            el.classList.add("gallery-item-next");
          }
        });
      }

      // Construct the carousel navigation
      setNav() {
        galleryContainer.appendChild(document.createElement("ul")).className =
          "gallery-nav";

        this.carouselArray.forEach((item) => {
          const nav: any = galleryContainer.lastElementChild;
          nav.appendChild(document.createElement("li"));
        });
      }

      // Construct the carousel controls
      setControls() {
        this.carouselControls.forEach((control: any) => {
          galleryControlsContainer.appendChild(
            document.createElement("button")
          ).className = `gallery-controls-${control}`;
        });
      }

      // Add a click event listener to trigger setCurrentState method to rearrange carousel

      useControls() {
        const test = () => {
          const target = document.querySelector(".gallery-controls-next");
          const selectedItem = document.querySelectorAll(
            ".gallery-item-selected"
          );
          const previousSelectedItem = document.querySelectorAll(
            ".gallery-item-previous"
          );
          const nextSelectedItem =
            document.querySelectorAll(".gallery-item-next");
          const firstCarouselItem = document.querySelectorAll(
            ".gallery-item-first"
          );
          const lastCarouselItem =
            document.querySelectorAll(".gallery-item-last");

          this.setCurrentState(
            target,
            selectedItem,
            previousSelectedItem,
            nextSelectedItem,
            firstCarouselItem,
            lastCarouselItem
          );
        };

        interval = setInterval(test, 5000);

        function resetInterval() {
          clearInterval(interval);
          interval = setInterval(test, 5000);
        }

        const triggers = [...galleryControlsContainer.childNodes];
        triggers.forEach((control) => {
          control.addEventListener("click", () => {
            const target = control;
            const selectedItem = document.querySelectorAll(
              ".gallery-item-selected"
            );
            const previousSelectedItem = document.querySelectorAll(
              ".gallery-item-previous"
            );
            const nextSelectedItem =
              document.querySelectorAll(".gallery-item-next");
            const firstCarouselItem = document.querySelectorAll(
              ".gallery-item-first"
            );
            const lastCarouselItem =
              document.querySelectorAll(".gallery-item-last");

            this.setCurrentState(
              target,
              selectedItem,
              previousSelectedItem,
              nextSelectedItem,
              firstCarouselItem,
              lastCarouselItem
            );
            resetInterval();
          });
        });
      }
    }
    var interval: any;
    const exampleCarousel = new Carousel(
      galleryContainer,
      galleryItems,
      galleryControls
    );

    exampleCarousel.setControls();
    exampleCarousel.setNav();
    exampleCarousel.setInitialState();
    exampleCarousel.useControls();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="gallery">
      <div className="gallery-container">
        <div className="gallery-item">
          <Image
            src="https://res.cloudinary.com/smile159/image/upload/v1660496002/eifi7rrt8ycgui1ecgcx.png"
            alt="img"
            width={600}
            height={350}
          />
        </div>
        <div className="gallery-item">
          <Image
            src="https://res.cloudinary.com/smile159/image/upload/v1660496042/yskruh8ud8a30pxxi4fw.png"
            alt="img"
            width={600}
            height={350}
          />
        </div>
        <div className="gallery-item">
          <Image
            src="https://res.cloudinary.com/smile159/image/upload/v1660496050/u2msdl7bmnr8xj5o9k6e.jpg"
            alt="img"
            width={600}
            height={350}
          />
        </div>
        <div className="gallery-item">
          <Image
            src="https://res.cloudinary.com/smile159/image/upload/v1660496091/ramorlzxcp0zg21ya9qx.jpg"
            alt="img"
            width={600}
            height={350}
          />
        </div>
        <div className="gallery-item">
          <Image
            src="https://res.cloudinary.com/smile159/image/upload/v1660496211/w6sslpnyzgtcfsadopxg.png"
            alt="img"
            width={600}
            height={350}
          />
        </div>

        <div className="gallery-controls"></div>
      </div>
    </div>
  );
};
export default Carouse;
