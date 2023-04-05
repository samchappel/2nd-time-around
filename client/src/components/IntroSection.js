import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";

import Header, { NavLink as NavBase, NavLinks, PrimaryLink as PrimaryLinkBase, NavToggle, DesktopNavLinks } from "./Navigation.js";

const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none w-full`}
  ${DesktopNavLinks} ${NavBase} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-gray-500`}
  }
`;

const StyledNavLinks = tw.div`flex justify-start items-center w-full`;

const NavLink = styled(RouterNavLink)`
  ${tw`border-none hover:border-none text-white hover:text-white mr-4`}
`;
const SecondTimeAroundLink = styled(NavLink)`
  ${tw`text-white font-semibold border-none hover:border-none`}
`;

const PrimaryLink = tw(PrimaryLinkBase)`rounded-full`
const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover h-screen`}
  height: 75vh;
  background-image: url("https://extramile.thehartford.com/wp-content/uploads/2019/11/Difference-Between-Vintage-And-Antique.jpg");
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-black opacity-50`;

const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto h-full flex flex-col`;
const Content = tw.div`px-4 flex flex-1 flex-col justify-center items-center`;

const Heading = styled.h1`
  ${tw`text-3xl text-center sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-snug -mt-24 sm:mt-0`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const PrimaryAction = tw.button`rounded-full px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-f38425 font-bold transition duration-300 text-gray-100 hover:bg-orange-700 focus:outline-none outline-none`;
const NavLinksStyled = styled.ul`
  ${tw`flex items-center justify-start mr-8`}
  flex: 1;
`;

const HeaderNavWrapper = styled.div`
  ${tw`absolute top-0 left-0 right-0 bg-white shadow-lg`}
  transform-origin: top;
  transform: scaleY(0);
  transition: transform 0.2s ease-out;
  z-index: -1;

  &.open {
    transform: scaleY(1);
  }
`;

const HeaderNavList = styled.nav`
  ${tw`flex flex-col items-center py-4`}
  ${NavLink} {
    ${tw`text-gray-800`}
  }
`;

export default () => {
    const navLinks = [
      <StyledNavLinks key="links">
        <NavLinksStyled key={1}>
          <NavLink to="#" activeClassName="border-b-2 border-white">
            Home
          </NavLink>
          <NavLink to="#" activeClassName="border-b-2 border-white">
            About
          </NavLink>
          <NavLink to="#" activeClassName="border-b-2 border-white">
            Shop
          </NavLink>
          <NavLink to="#" activeClassName="border-b-2 border-white">
            Log In
          </NavLink>
        </NavLinksStyled>
        <SecondTimeAroundLink to="/#" activeClassName="border-none">
          2nd Time Around
        </SecondTimeAroundLink>
      </StyledNavLinks>,
    ];

    return (
      <Container>
        <OpacityOverlay />
        <HeroContainer>
          <StyledHeader links={navLinks} />
          <Content>
            <Heading>
              Vintage and Pre-Owned Collectibles
            </Heading>
            <PrimaryAction>Learn More</PrimaryAction>
          </Content>
        </HeroContainer>
      </Container>
    );
};