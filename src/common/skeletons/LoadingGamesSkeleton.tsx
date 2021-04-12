import { Card } from "antd";
import React from "react";
import { SkeletonCard } from "./styles";

const LoadingGamesSkeleton: React.FC = () => {
  return (
    <>
      <SkeletonCard loading={true}>
        <Card.Meta
          title="Loading 1 card title"
          description="Loading 1 card description"
        />
      </SkeletonCard>
      <SkeletonCard loading={true}>
        <Card.Meta
          title="Loading 2 card title"
          description="Loading 2 card description"
        />
      </SkeletonCard>
      <SkeletonCard loading={true}>
        <Card.Meta
          title="Loading 3 card title"
          description="Loading 3 card description"
        />
      </SkeletonCard>
      <SkeletonCard loading={true}>
        <Card.Meta
          title="Loading 4 card title"
          description="Loading 4 card description"
        />
      </SkeletonCard>
    </>
  );
};

export default LoadingGamesSkeleton;
