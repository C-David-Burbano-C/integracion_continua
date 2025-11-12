import RobotSimulator from "../components/RobotSimulator";

export default function SimulacionRobots() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12">
      <div className="container mx-auto px-4">
        <RobotSimulator />
      </div>
    </section>
  );
}
