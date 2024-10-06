"use client";

import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import HeroSection from "../components/herosection";
import ProductGoalsSection from "../components/productgoals";
import AboutUsSection from "../components/aboutus";
import ArchitectureWorkflowSection from "../components/architectureworkflow.js";
function Land() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <ProductGoalsSection />
      <AboutUsSection />
      <ArchitectureWorkflowSection/>
      <Footer />
    </div>
  );
}

export default Land;
