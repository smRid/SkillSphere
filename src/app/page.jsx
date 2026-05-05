import HeroSlider from "@/components/HeroSlider";
import PopularCourses from "@/components/PopularCourses";
import TrendingCourses from "@/components/TrendingCourses";
import LearningTips from "@/components/LearningTips";
import TopInstructors from "@/components/TopInstructors";
import CtaBand from "@/components/CtaBand";
import { getPopularCourses, getTrendingCourses } from "@/data/courses";

export default function HomePage() {
  return (
    <div>
      <HeroSlider />
      <PopularCourses courses={getPopularCourses()} />
      <TrendingCourses courses={getTrendingCourses()} />
      <LearningTips />
      <TopInstructors />
      <CtaBand />
    </div>
  );
}
