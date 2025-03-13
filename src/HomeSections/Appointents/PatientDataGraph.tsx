import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { AppointmentType } from '../ProfileDataType';


// ------ The Chart Component ------
const PatientLineChart = ({appointmentsData}:{appointmentsData:AppointmentType[]}) => {
  // 1. Sort appointments by date
  const sortedAppointments = appointmentsData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // 2. Prepare arrays for chart labels and each vital
  const labels = sortedAppointments.map(appt => appt.date);

  // Parse bloodPressure (e.g. "140/90" => [140, 90])
  const heartRates: number[] = [];
  const temperatures: number[] = [];
  const systolics: number[] = [];
  const diastolics: number[] = [];

  sortedAppointments.forEach(appt => {
    const { heartRate, temperature, bloodPressure } = appt.vitals;
    heartRates.push(heartRate);
    temperatures.push(temperature);

    // Split "140/90" (systolic/diastolic)
    const [sys, dia] = bloodPressure.split('/').map(Number);
    systolics.push(sys);
    diastolics.push(dia);
  });

  // 3. Build chart data with multiple datasets
  const data = {
    labels,
    datasets: [
      {
        label: 'Heart Rate (bpm)',
        data: heartRates,
        // optional styling properties here
      },
      {
        label: 'Temperature (°F)',
        data: temperatures,
      },
      {
        label: 'BP Systolic (mmHg)',
        data: systolics,
      },
      {
        label: 'BP Diastolic (mmHg)',
        data: diastolics,
      },
    ],
  };

  // 4. Chart configuration (optional)
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    // If you want a second y-axis or custom scales, do it here:
    // scales: { y: { beginAtZero: false } },
  };

  return (
    <div className='vitals-chart glassmorph' style={{ height: '50vh' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default PatientLineChart;
