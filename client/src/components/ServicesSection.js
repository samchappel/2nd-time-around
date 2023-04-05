import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { SectionHeading, Subheading as SubheadingBase } from "./misc/Headings.js";
import { SectionDescription } from "./misc/Typography.js";
import { Container, ContentWithPaddingXl } from "./misc/Layouts.js";
import ArrowRightIcon from "../images/arrow-right-icon.png";
import FastDeliveryIcon from "../images/fast-delivery.png";
import SafePackagingIcon from "../images/logistics-delivery.png";
import TechSupportIcon from "../images/technical-support.png";

const Heading = tw(SectionHeading)``;
const Subheading = tw(SubheadingBase)`font-bold text-black`;
const Description = tw(SectionDescription)`text-center mx-auto text-gray-300 text-black`;
const ThreeColumnContainer = styled.div`
  ${tw`mt-10 flex flex-col items-center lg:items-stretch lg:flex-row flex-wrap lg:justify-center max-w-screen-lg mx-auto`}
`;
const Column = styled.div`
  ${tw`lg:w-1/3 max-w-xs`}
`;

const Card = styled.a`
  ${tw`flex flex-col items-center text-center h-full mx-4 px-4 py-8 rounded transition-transform duration-300 hover:cursor-pointer transform hover:scale-105 `}
  .imageContainer {
    ${tw`text-center rounded-full p-4 bg-gray-100`}
    img {
      ${tw`w-8 h-8`}
    }
  }

  .title {
    ${tw`mt-4 font-bold text-xl leading-none text-black`}
  }
  
  .description {
    ${tw`mt-4 text-sm font-medium text-gray-300 text-black`}
  }
  
  .link {
    ${tw`mt-auto inline-flex items-center pt-5 text-sm font-bold text-blue-500 leading-none hocus:text-blue-900 transition duration-300 text-black`}
  }
    .icon {
      ${tw`ml-2 w-4`}
    }
  }
`;

export default ({
  cards = [
    {
      imageSrc: FastDeliveryIcon,
      title: "Fast Shipping Options",
      description: "We strictly only deal with vendors that provide top notch security."
    },
    {
      imageSrc: SafePackagingIcon,
      title: "Secure Packaging",
      description: "Lorem ipsum donor amet siti ceali placeholder text"
    },
    {
      imageSrc: TechSupportIcon,
      title: "24/7 Support",
      description: "Lorem ipsum donor amet siti ceali placeholder text"
    }
  ],
  linkText = "Learn More",
  heading = "Our Services",
  subheading = "",
  description = "",
  imageContainerCss = null,
  imageCss = null
}) => {
  /*
   * This componets accepts a prop - `cards` which is an array of object denoting the cards. Each object in the cards array can have the following keys (Change it according to your need, you can also add more objects to have more cards in this feature component):
   *  1) imageSrc - the image shown at the top of the card
   *  2) title - the title of the card
   *  3) description - the description of the card
   *  4) url - the url that the card should goto on click
   */
  return (
    <Container>
      <ContentWithPaddingXl>
        {subheading && <Subheading>{subheading}</Subheading>}
        {heading && <Heading>{heading}</Heading>}
        {description && <Description>{description}</Description>}
        <ThreeColumnContainer>
          {cards.map((card, i) => (
            <Column key={i}>
              <Card >
                <span className="imageContainer" css={imageContainerCss}>
                  <img src={card.imageSrc} alt="" css={imageCss} />
                </span>
                <span className="title">{card.title}</span>
                <p className="description">{card.description}</p>
                {linkText && (
                  <span className="link">
                    <span>{linkText}</span>
                    <img src={ArrowRightIcon} alt="Arrow Right" className="icon" />
                  </span>
                )}
              </Card>
            </Column>
          ))}
        </ThreeColumnContainer>
      </ContentWithPaddingXl>
      <ThreeColumnContainer>
      </ThreeColumnContainer>
    </Container>
  );
}