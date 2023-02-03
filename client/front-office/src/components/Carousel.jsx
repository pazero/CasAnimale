import React, { useState } from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  //Stack,
  Heading,
  Text,
  Container,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";

// Settings for the slider
const settings = {
  dots: false,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function CaptionCarousel() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState([]);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });

  // This list contains all the data for carousels
  // This can be static or loaded from a server
  // in production/produzione cambiare url
  const cards = [
    {
      title: "Veterinary service",
      text: "Look at our associated vets, choose the one you prefer and book an appointment! Are you a freelancer vet or an agencie? Contact us if you want to collaborate!",
      image: "/f/carousel/vet.jpg",
    },
    {
      title: "Psychologist service",
      text: "Your pet looks sad and needs a shoulder to cry on? We have a pool of psychologists from witch you can choose. Book an appointment! Are you a freelancer pet psychologist or an agencie? Contact us if you want to collaborate!",
      image: "/f/carousel/psychologist.jpg",
    },
    {
      title: "Pet sitting service",
      text: "You have to go on vacation with your soulmate, or alone, and you don't know where to leave your pet? Book an appointment with one of our pet sitter! Are you a freelancer pet sitter or an agencie? Contact us if you want to collaborate!",
      image: "/f/carousel/petsitting.jpeg",
    },
    {
      title: "Pet equipment shop",
      text: "Need a new blanket for your kangaroo? We have it! Check out the e-commerce, there you can find everything you may need!",
      image: "/f/carousel/pet_toys.jpg",
    },
    {
      title: "Grooming service",
      text: "Your bunny is a little stinky? That's not good! Bring it to one of our goomers, but remember to book an appointment first! Are you a freelancer groomer or an agencie? Contact us if you want to collaborate!",
      image: "/f/carousel/grooming.jpg",
    },
    {
      title: "It's time to play!",
      text: "Play some fun games in our game area. There you will find some cute animal based game, some funny animals videos and even some useful information! Don't play too much, remember to go for a walk.",
      image: "/f/carousel/game.jpeg",
    },
    {
      title: "Chat platforms",
      text: "Post your opinions, fun facts, curiosities and everything you want about you and your animals on our chat platforms: EccoloQua!, FindPartner and HelpMe! (only for VIP users)",
      image: "/f/carousel/chat.jpg",
    },
  ];

  return (
    <Box
      position={"relative"}
      height={"100%"}
      width={"full"}
      overflow={"hidden"}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="Slide card to left"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="Slide card to right"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            height={"l"}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`linear-gradient(rgba(255,255,255,.6), rgba(255,255,255,.6)), url(${card.image})`}
          >
            {/* caption */}
            <Container
              display={"flex"}
              alignItems={"center"}
              size="container.lg"
              height="75vh"
              position="relative"
            >
              <div
                transform="translate(0, -50%)"
                position="absolute"
                top="50vh"
                className="p-3 bg-gray-100 bg-opacity-50 rounded-lg"
              >
                <Heading
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                  className="text-black pb-6 uppercase"
                >
                  {card.title}
                </Heading>
                <Text
                  fontSize={{ base: "md", lg: "lg" }}
                  className="font-semibold"
                >
                  {card.text}
                </Text>
              </div>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
