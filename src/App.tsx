import { SelectDocument } from './components/SelectDocument';
import { RequestForm } from './components/RequestForm';
import { ResponseBox } from './components/ResponseBox';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Generador de Documentos Tributarios
        </h2>
        <p className="text-gray-600 mt-2">Sistema de generación de documentos fiscales</p>
      </header>
      
      <main className="max-w-7xl mx-auto">
        {/* Select Document */}
        <section className="mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <SelectDocument />
          </div>
        </section>
        
        {/* Request Form */}
        <section className="mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <RequestForm />
          </div>
        </section>
        
        {/* Response Box */}
        <section>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <ResponseBox />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;