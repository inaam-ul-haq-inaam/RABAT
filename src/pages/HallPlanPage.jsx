import HallPlanBlueprint from '../components/HallPlanBlueprint.jsx';
import HallPlanCapacity from '../components/HallPlanCapacity.jsx';
import HallPlanStage from '../components/HallPlanStage.jsx';

/** Original pageMap.hallplan — hallplan, hallplan-capacity, hallplan-stage */
export default function HallPlanPage() {
  return (
    <>
      <HallPlanBlueprint />
      <HallPlanCapacity />
      <HallPlanStage />
    </>
  );
}
