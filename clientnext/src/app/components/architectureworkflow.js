"use client";
import React from "react";

function ArchitectureWorkflowSection() {
  return (
    <div className="architecture-workflow-section">
      <h1>Architecture & Workflow</h1>
      <p className="description">
        The system architecture combines a robust frontend, a scalable backend,
        and a secure blockchain integration. A relational database efficiently
        stores structured data, while smart contracts ensure trustless and
        transparent operations.
      </p>

      <div className="gif-container">
        <img src="/assets/architecture-workflow.gif" />
      </div>
    </div>
  );
}

export default ArchitectureWorkflowSection;
