import Slider from "@/components/templates/Index/Slider";
import React from "react";
import About from "@/components/templates/Index/About";
import Services from "@/components/templates/Index/Services";
import Offer from "@/components/templates/Index/Offer";
import Menu from "@/components/templates/Index/Menu";
import Reservation from "@/components/templates/Index/reservation";
import Testimonials from "@/components/templates/Index/Testimonials";

function Index({ data }) {
  return (
    <>
      <Slider />
      <About />
      <Services services={data.services} />
      <Offer />
      <Menu data={data.menu} />
      <Reservation />
      <Testimonials data={data.comments} />
    </>
  );
}

export async function getStaticProps() {
  const servicesResponse = await fetch(`${process.env.url}/services`);
  const servicesData = await servicesResponse.json();

  const menuResponse = await fetch(`${process.env.url}/menu`);
  const menuData = await menuResponse.json();

  const commentsResponse = await fetch(`${process.env.url}/comments`);
  const commentsData = await commentsResponse.json();

  return {
    props: {
      data: {
        services: servicesData,
        menu: menuData,
        comments: commentsData,
      },
    },
    revalidate: 60 * 60 * 12, // Second
  };
}

export default Index;
