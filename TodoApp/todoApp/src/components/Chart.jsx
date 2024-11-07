import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useMemo } from "react";
import PropTypes from "prop-types";

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart({ todos = [] }) {
  const dataCounts = useMemo(() => {
    const counts = { important: 0, done: 0, other: 0 };
    todos.forEach((todo) => {
      if (todo.complate) {
        counts.done += 1;
      } else if (todo.important) {
        counts.important += 1;
      } else {
        counts.other += 1;
      }
    });
    return counts;
  }, [todos]);

  const data = {
    labels: ["Done", "Important", "Other"],
    datasets: [
      {
        data: [dataCounts.done, dataCounts.important, dataCounts.other],
        backgroundColor: ["#80BC00", "#00A9D7", "#6E7C7C"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full mb-4">
        <h3 className="text-left text-xl font-semibold">Task Status</h3>
        <hr className="border-t-2 border-gray-300 mt-2" />
      </div>

      {/* Pie Chart and Vertical Legend */}
      <div className="flex justify-center items-center w-full">
        <div className="w-[50%] h-fit">
          <Pie data={data} options={options} />
        </div>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full inline-block mr-2 bg-[#80BC00]"></span>
            <span>Done</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full inline-block mr-2 bg-[#00A9D7]"></span>
            <span>Important</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full inline-block mr-2 bg-[#6E7C7C]"></span>
            <span>Other</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Chart.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      complate: PropTypes.bool,
      important: PropTypes.bool,
    })
  ),
};

export default Chart;
