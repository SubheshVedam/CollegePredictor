"use client";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import CollegeSearchForm from './components/college/CollegeSearchForm';

export default function CollegePredictorPage() {
  return (
    <Provider store={store}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">College Predictor</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <CollegeSearchForm />
        </div>
      </div>
    </Provider>
  );
}