export default function Step({ step, currentStep }: { step: number; currentStep: number }) {
  return <div style={{ height: '7px', width: '150px', borderRadius: 50, backgroundColor: step < currentStep ? '#22c55e' : '#d9d9d9' }} />;
}
