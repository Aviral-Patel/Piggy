import React from 'react';

const FeatureSection = () => {
  const features = [
    {
      id: 1,
      title: 'The Regex Registry',
      description: 'A comprehensive system to store and manage Regex patterns for different banks and SMS types. Track templates with full audit trails, status management, and bank-specific configurations.',
      details: [
        'Template management with Bank Name, Pattern, SMS Type (Debit/Credit/Bill)',
        'Status tracking: DRAFT, PENDING_APPROVAL, ACTIVE, DEPRECATED',
        'Complete audit trail with creator and approval tracking',
        'Multi-bank support (HDFC, ICICI, and more)'
      ],
      icon: '📋'
    },
    {
      id: 2,
      title: 'Management Workflow & Dashboard',
      description: 'A governance layer with maker-checker workflow. Create, test, and approve Regex patterns through a state machine-driven lifecycle with real-time testing capabilities.',
      details: [
        'State Machine: Draft → Pending → Active → Deprecated',
        'Real-time Regex testing with SMS preview',
        'Maker-Checker approval workflow',
        'Approval queue for pending templates'
      ],
      icon: '⚙️'
    },
    {
      id: 3,
      title: 'The Parser Engine',
      description: 'Transform unstructured bank SMS alerts into structured financial ledger data. Auto-identify templates, extract precise financial data using BigDecimal, and handle unmatched SMS gracefully.',
      details: [
        'Auto-identification of matching templates from raw SMS',
        'Structured Fintech Data Object extraction',
        'BigDecimal precision for all currency values',
        'Fallback handling for unidentified SMS patterns'
      ],
      icon: '🔧'
    }
  ];

  return (
    <div className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-950 mb-4">
            Fintech SMS-to-Ledger <span className="text-blue-600">Engine</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Transform unstructured bank SMS alerts into structured financial data with our 
            comprehensive Management Portal and Parsing Engine. Maintain accurate Personal Finance 
            Management through automated transaction tracking across multiple banks.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{feature.icon}</div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-950 mb-4">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Details List */}
              <ul className="space-y-3">
                {feature.details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">✓</span>
                    <span className="text-gray-600 text-sm">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-950 mb-4">
              Complete Transaction Lifecycle Management
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              From raw, unstructured SMS text to a structured ledger entry—our system covers 
              the entire lifecycle while introducing Administrative Governance through workflow 
              and state management. Track spends, bills, and balances across multiple banks automatically.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                Maker-Checker Workflow
              </span>
              <span className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                Real-time Testing
              </span>
              <span className="bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                BigDecimal Precision
              </span>
              <span className="bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">
                Auto-Identification
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
