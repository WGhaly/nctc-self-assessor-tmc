import { createContext, useContext, useState } from 'react';

const AssessmentContext = createContext(null);

const initialState = {
  // Step 1 — Inventor info
  fullName: '',
  phone: '',
  affiliation: '',
  inventionTitle: '',
  description: '',
  sector: '',

  // Step 2-4 — Matrix results
  trl: null,   // 1-9
  mrl: null,   // 1-10
  crl: null,   // 1-9
};

export function AssessmentProvider({ children }) {
  const [data, setData] = useState(initialState);

  function updateData(fields) {
    setData(prev => ({ ...prev, ...fields }));
  }

  function reset() {
    setData(initialState);
  }

  return (
    <AssessmentContext.Provider value={{ data, updateData, reset }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error('useAssessment must be used inside AssessmentProvider');
  return ctx;
}
