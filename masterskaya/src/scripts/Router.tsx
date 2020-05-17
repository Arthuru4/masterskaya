import React from "react";
import Home from "../Components/Content/Home/Home";
import Contact from "../Components/Content/Contact/Contact";
import About from "../Components/Content/About/About";
import Categories from "../Components/Content/Categories/Categories";
import Generator from "../Components/Content/Generator/Generator";
import Item from "../Components/Content/Item/Item";
import Order from "../Components/Order/Order";

const ContentRouter = {
    "/": () => <Home />,
    "/contact": () => <Contact />,
    // @ts-ignore
    "/item:id": ({id}) => <Item id={id} />,
    "/categories": () => <Categories />,
    "/generator": () => <Generator />,
    "/about": () => <About />,
    "/order": () => <Order />
};

export default ContentRouter;
