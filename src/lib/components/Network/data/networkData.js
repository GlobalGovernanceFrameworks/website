// src/lib/components/Network/data/networkData.js
// Sample data for network visualizations

/**
 * Get Formal-Informal Actor Network data
 * @param {string} view - Regional context view
 * @returns {Object} - Nodes and edges data
 */
export function getFormalInformalData(view) {
  // Get specific data based on view
  switch (view) {
    case 'africa':
      return formalInformalAfrica;
    case 'middle-east':
      return formalInformalMiddleEast;
    case 'south-asia':
      return formalInformalSouthAsia;
    case 'latin-america':
      return formalInformalLatinAmerica;
    case 'global':
    default:
      return formalInformalGlobal;
  }
}

/**
 * Get Resource Flow Mapping data
 * @param {string} view - Regional context view
 * @returns {Object} - Nodes and edges data
 */
export function getResourceFlowData(view) {
  // Get specific data based on view
  switch (view) {
    case 'africa':
      return resourceFlowAfrica;
    case 'middle-east':
      return resourceFlowMiddleEast;
    case 'south-asia':
      return resourceFlowSouthAsia;
    case 'latin-america':
      return resourceFlowLatinAmerica;
    case 'global':
    default:
      return resourceFlowGlobal;
  }
}

/**
 * Get Influence Analysis data
 * @param {string} view - Regional context view
 * @returns {Object} - Nodes and edges data
 */
export function getInfluenceData(view) {
  // Get specific data based on view
  switch (view) {
    case 'africa':
      return influenceAfrica;
    case 'middle-east':
      return influenceMiddleEast;
    case 'south-asia':
      return influenceSouthAsia;
    case 'latin-america':
      return influenceLatinAmerica;
    case 'global':
    default:
      return influenceGlobal;
  }
}

/**
 * Get Trust Relationship Matrices data
 * @param {string} view - Regional context view
 * @returns {Object} - Nodes and edges data
 */
export function getTrustData(view) {
  // Get specific data based on view
  switch (view) {
    case 'africa':
      return trustAfrica;
    case 'middle-east':
      return trustMiddleEast;
    case 'south-asia':
      return trustSouthAsia;
    case 'latin-america':
      return trustLatinAmerica;
    case 'global':
    default:
      return trustGlobal;
  }
}

// Global Formal-Informal Actor Network
const formalInformalGlobal = {
  nodes: [
    { id: 1, label: 'United Nations', group: 1, value: 10, description: 'Primary global intergovernmental organization', connections: ['UNDP', 'UNHCR', 'World Bank'] },
    { id: 2, label: 'World Bank', group: 1, value: 8, description: 'International financial institution providing loans and grants', connections: ['UN', 'IMF', 'Regional Development Banks'] },
    { id: 3, label: 'African Union', group: 1, value: 7, description: 'Continental union consisting of 55 member states', connections: ['ECOWAS', 'UN', 'EU'] },
    { id: 4, label: 'European Union', group: 1, value: 8, description: 'Political and economic union of 27 member states', connections: ['UN', 'NATO', 'Council of Europe'] },
    { id: 5, label: 'Int\'l Peace Institute', group: 2, value: 6, description: 'Independent think tank focused on peace, security, and development', connections: ['UN', 'Academia', 'Civil Society Networks'] },
    { id: 6, label: 'Civil Society Networks', group: 2, value: 7, description: 'Transnational coalition of civil society organizations working on peacebuilding', connections: ['Local Peace Committees', 'Regional NGOs', 'UN'] },
    { id: 7, label: 'Peace Direct', group: 2, value: 5, description: 'International NGO supporting local peacebuilding initiatives', connections: ['Community Peace Actors', 'International Donors', 'Research Institutions'] },
    { id: 8, label: 'Local Peace Committees', group: 3, value: 6, description: 'Community-led institutions managing local conflicts', connections: ['Community Leaders', 'Regional NGOs', 'UN Peacekeeping'] },
    { id: 9, label: 'Religious Leaders', group: 3, value: 5, description: 'Faith-based actors engaged in grassroots peace efforts', connections: ['Interfaith Networks', 'Local Communities', 'Regional Bodies'] },
    { id: 10, label: 'Women\'s Peace Networks', group: 3, value: 6, description: 'Women-led networks advocating for inclusive peace processes', connections: ['UN Women', 'Civil Society Networks', 'Local Communities'] },
    { id: 11, label: 'Academia', group: 2, value: 4, description: 'University and research institutions studying peace and conflict', connections: ['Policy Institutes', 'UN', 'Think Tanks'] },
    { id: 12, label: 'Private Sector', group: 4, value: 3, description: 'Business entities engaged in peace efforts', connections: ['UN Global Compact', 'Governments', 'Civil Society'] }
  ],
  edges: [
    { from: 1, to: 2, value: 8, title: 'Strategic partnership', from_label: 'United Nations', to_label: 'World Bank', description: 'Formal collaboration on sustainable development and peacebuilding' },
    { from: 1, to: 3, value: 7, title: 'Institutional cooperation', from_label: 'United Nations', to_label: 'African Union', description: 'Framework for collaboration on peace and security in Africa' },
    { from: 1, to: 4, value: 8, title: 'Strategic partnership', from_label: 'United Nations', to_label: 'European Union', description: 'Formal cooperation on global governance and crisis response' },
    { from: 1, to: 5, value: 6, title: 'Research partnership', from_label: 'United Nations', to_label: 'Int\'l Peace Institute', description: 'Knowledge sharing and policy development' },
    { from: 1, to: 6, value: 5, title: 'Consultation mechanism', from_label: 'United Nations', to_label: 'Civil Society Networks', description: 'Structured engagement with civil society on peace issues' },
    { from: 1, to: 8, value: 3, title: 'Implementation partnership', from_label: 'United Nations', to_label: 'Local Peace Committees', description: 'Support for local conflict resolution mechanisms' },
    { from: 2, to: 6, value: 4, title: 'Funding relationship', from_label: 'World Bank', to_label: 'Civil Society Networks', description: 'Financial support for peacebuilding initiatives' },
    { from: 3, to: 8, value: 5, title: 'Continental-local linkage', from_label: 'African Union', to_label: 'Local Peace Committees', description: 'Continental support for community peace structures' },
    { from: 4, to: 7, value: 6, title: 'Funding relationship', from_label: 'European Union', to_label: 'Peace Direct', description: 'Financial support for local peacebuilding' },
    { from: 5, to: 11, value: 7, title: 'Research collaboration', from_label: 'Int\'l Peace Institute', to_label: 'Academia', description: 'Joint research on peacebuilding effectiveness' },
    { from: 6, to: 7, value: 8, title: 'Network collaboration', from_label: 'Civil Society Networks', to_label: 'Peace Direct', description: 'Coordination of civil society peacebuilding efforts' },
    { from: 6, to: 8, value: 9, title: 'Support relationship', from_label: 'Civil Society Networks', to_label: 'Local Peace Committees', description: 'Capacity building and technical support' },
    { from: 6, to: 10, value: 8, title: 'Coalition partnership', from_label: 'Civil Society Networks', to_label: 'Women\'s Peace Networks', description: 'Joint advocacy for women\'s participation in peace processes' },
    { from: 7, to: 8, value: 9, title: 'Direct support', from_label: 'Peace Direct', to_label: 'Local Peace Committees', description: 'Funding and capacity building for local peace structures' },
    { from: 8, to: 9, value: 7, title: 'Community collaboration', from_label: 'Local Peace Committees', to_label: 'Religious Leaders', description: 'Faith-based approaches to local peacebuilding' },
    { from: 8, to: 10, value: 6, title: 'Inclusive engagement', from_label: 'Local Peace Committees', to_label: 'Women\'s Peace Networks', description: 'Women\'s participation in local peace governance' },
    { from: 9, to: 10, value: 5, title: 'Grassroots alliance', from_label: 'Religious Leaders', to_label: 'Women\'s Peace Networks', description: 'Cooperation on community peace initiatives' },
    { from: 11, to: 5, value: 8, title: 'Knowledge exchange', from_label: 'Academia', to_label: 'Int\'l Peace Institute', description: 'Research sharing on conflict dynamics and resolution' },
    { from: 12, to: 6, value: 4, title: 'Corporate engagement', from_label: 'Private Sector', to_label: 'Civil Society Networks', description: 'Private sector support for peacebuilding efforts' },
    { from: 12, to: 1, value: 5, title: 'UN Global Compact', from_label: 'Private Sector', to_label: 'United Nations', description: 'Corporate commitment to peace, justice and strong institutions' }
  ]
};

// Middle East Formal-Informal Actor Network
const formalInformalMiddleEast = {
  nodes: [
    { id: 1, label: 'Arab League', group: 1, value: 8, description: 'Regional organization of Arab states', connections: ['UN', 'National Governments', 'Regional Initiatives'] },
    { id: 2, label: 'UN ESCWA', group: 1, value: 7, description: 'UN Economic and Social Commission for Western Asia', connections: ['UN', 'Arab League', 'National Governments'] },
    { id: 3, label: 'National Governments', group: 1, value: 9, description: 'Official governmental institutions', connections: ['Arab League', 'UN', 'Regional Powers'] },
    { id: 4, label: 'Cairo Peace Center', group: 2, value: 6, description: 'Regional think tank on peace and security', connections: ['Academic Institutions', 'Regional NGOs', 'UN Agencies'] },
    { id: 5, label: 'Regional NGO Network', group: 2, value: 7, description: 'Coalition of civil society organizations', connections: ['Local Initiatives', 'International NGOs', 'Donor Agencies'] },
    { id: 6, label: 'Women\'s Peace Forum', group: 2, value: 5, description: 'Coalition promoting women\'s participation in peace', connections: ['Local Women Groups', 'UN Women', 'International Donors'] },
    { id: 7, label: 'Local Peace Councils', group: 3, value: 6, description: 'Community-level conflict resolution bodies', connections: ['Tribal Leaders', 'Religious Authorities', 'Local NGOs'] },
    { id: 8, label: 'Religious Leaders', group: 3, value: 8, description: 'Faith-based leaders engaged in peacebuilding', connections: ['Interfaith Network', 'Local Communities', 'Religious Institutions'] },
    { id: 9, label: 'Youth Initiative', group: 3, value: 4, description: 'Youth-led peace movements', connections: ['Universities', 'Social Media Networks', 'International Youth Forums'] },
    { id: 10, label: 'Private Sector Forum', group: 4, value: 5, description: 'Business entities engaged in regional stability', connections: ['Chambers of Commerce', 'National Governments', 'Development Agencies'] }
  ],
  edges: [
    { from: 1, to: 2, value: 8, title: 'Regional partnership', from_label: 'Arab League', to_label: 'UN ESCWA', description: 'Coordination on regional peace and development' },
    { from: 1, to: 3, value: 9, title: 'Institutional relationship', from_label: 'Arab League', to_label: 'National Governments', description: 'Member state governance frameworks' },
    { from: 1, to: 4, value: 5, title: 'Policy dialogue', from_label: 'Arab League', to_label: 'Cairo Peace Center', description: 'Research-policy linkage on regional issues' },
    { from: 2, to: 5, value: 6, title: 'Support mechanism', from_label: 'UN ESCWA', to_label: 'Regional NGO Network', description: 'Funding and technical assistance' },
    { from: 2, to: 6, value: 7, title: 'Gender partnership', from_label: 'UN ESCWA', to_label: 'Women\'s Peace Forum', description: 'Advancing women\'s participation in peace processes' },
    { from: 3, to: 7, value: 4, title: 'Governance relationship', from_label: 'National Governments', to_label: 'Local Peace Councils', description: 'Limited formal recognition and support' },
    { from: 3, to: 8, value: 6, title: 'Religious diplomacy', from_label: 'National Governments', to_label: 'Religious Leaders', description: 'Engagement on religious dimensions of peace' },
    { from: 3, to: 10, value: 7, title: 'Public-private partnership', from_label: 'National Governments', to_label: 'Private Sector Forum', description: 'Cooperation on stability and reconstruction' },
    { from: 4, to: 5, value: 7, title: 'Civil society alliance', from_label: 'Cairo Peace Center', to_label: 'Regional NGO Network', description: 'Research and advocacy collaboration' },
    { from: 5, to: 6, value: 8, title: 'Coalition partnership', from_label: 'Regional NGO Network', to_label: 'Women\'s Peace Forum', description: 'Joint advocacy for inclusive peace' },
    { from: 5, to: 7, value: 8, title: 'Support relationship', from_label: 'Regional NGO Network', to_label: 'Local Peace Councils', description: 'Capacity building and technical support' },
    { from: 5, to: 9, value: 7, title: 'Youth engagement', from_label: 'Regional NGO Network', to_label: 'Youth Initiative', description: 'Supporting youth participation in peace' },
    { from: 6, to: 7, value: 6, title: 'Women\'s participation', from_label: 'Women\'s Peace Forum', to_label: 'Local Peace Councils', description: 'Increasing women\'s role in local governance' },
    { from: 7, to: 8, value: 9, title: 'Community leadership', from_label: 'Local Peace Councils', to_label: 'Religious Leaders', description: 'Religious authority in local peace processes' },
    { from: 7, to: 9, value: 5, title: 'Intergenerational dialogue', from_label: 'Local Peace Councils', to_label: 'Youth Initiative', description: 'Youth inclusion in community governance' },
    { from: 8, to: 9, value: 4, title: 'Youth mentorship', from_label: 'Religious Leaders', to_label: 'Youth Initiative', description: 'Religious guidance for youth peace actors' },
    { from: 10, to: 5, value: 5, title: 'Corporate support', from_label: 'Private Sector Forum', to_label: 'Regional NGO Network', description: 'Business funding for civil society peacebuilding' },
    { from: 10, to: 7, value: 3, title: 'Community investment', from_label: 'Private Sector Forum', to_label: 'Local Peace Councils', description: 'Limited support for local stability initiatives' }
  ]
};

// Sample Resource Flow Network (Global)
const resourceFlowGlobal = {
  nodes: [
    { id: 1, label: 'Int\'l Donor Governments', group: 1, value: 10, description: 'Major state donors providing official development assistance', connections: ['Multilateral Funds', 'International NGOs', 'UN Agencies'] },
    { id: 2, label: 'Private Foundations', group: 1, value: 8, description: 'Major philanthropic organizations funding peacebuilding', connections: ['INGOs', 'Research Institutions', 'Local NGOs'] },
    { id: 3, label: 'UN Peacebuilding Fund', group: 1, value: 7, description: 'UN funding mechanism for peacebuilding projects', connections: ['UN Agencies', 'National Governments', 'Local Implementers'] },
    { id: 4, label: 'World Bank', group: 1, value: 9, description: 'Multilateral development bank providing conflict-related financing', connections: ['National Governments', 'Regional Development Banks', 'Large-scale Projects'] },
    { id: 5, label: 'International NGOs', group: 2, value: 8, description: 'Major implementing organizations with global reach', connections: ['Donor Governments', 'Local Partners', 'Conflict-affected Communities'] },
    { id: 6, label: 'UN Agencies', group: 2, value: 7, description: 'UN organizations implementing peace programs', connections: ['UN Headquarters', 'National Governments', 'Local Partners'] },
    { id: 7, label: 'Regional Organizations', group: 2, value: 6, description: 'Regional bodies implementing peace initiatives', connections: ['Member States', 'Multilateral Funders', 'Local Implementers'] },
    { id: 8, label: 'National Peacebuilding NGOs', group: 2, value: 5, description: 'Country-level organizations implementing programs', connections: ['International NGOs', 'Local CBOs', 'Government Ministries'] },
    { id: 9, label: 'Local Peace Committees', group: 3, value: 4, description: 'Community-based conflict resolution mechanisms', connections: ['Community Members', 'Local Government', 'National NGOs'] },
    { id: 10, label: 'Conflict-affected Communities', group: 3, value: 6, description: 'Direct beneficiaries of peacebuilding interventions', connections: ['Local Initiatives', 'Aid Programs', 'Government Services'] },
    { id: 11, label: 'Research Institutions', group: 2, value: 3, description: 'Organizations producing peacebuilding knowledge', connections: ['Universities', 'Think Tanks', 'Policy Centers'] }
  ],
  edges: [
    { from: 1, to: 3, value: 9, title: 'Major contribution', from_label: 'Int\'l Donor Governments', to_label: 'UN Peacebuilding Fund', description: 'Primary funding source for UN PBF' },
    { from: 1, to: 5, value: 8, title: 'Program funding', from_label: 'Int\'l Donor Governments', to_label: 'International NGOs', description: 'Direct grants for peacebuilding programs' },
    { from: 1, to: 6, value: 9, title: 'Core funding', from_label: 'Int\'l Donor Governments', to_label: 'UN Agencies', description: 'Assessed and voluntary contributions to UN' },
    { from: 1, to: 7, value: 7, title: 'Regional support', from_label: 'Int\'l Donor Governments', to_label: 'Regional Organizations', description: 'Support for regional peace mechanisms' },
    { from: 2, to: 5, value: 7, title: 'Project grants', from_label: 'Private Foundations', to_label: 'International NGOs', description: 'Targeted funding for specific initiatives' },
    { from: 2, to: 8, value: 5, title: 'Direct support', from_label: 'Private Foundations', to_label: 'National Peacebuilding NGOs', description: 'Grants to national-level organizations' },
    { from: 2, to: 11, value: 8, title: 'Research funding', from_label: 'Private Foundations', to_label: 'Research Institutions', description: 'Support for peace and conflict research' },
    { from: 3, to: 6, value: 8, title: 'UN implementation', from_label: 'UN Peacebuilding Fund', to_label: 'UN Agencies', description: 'Funding for UN-implemented projects' },
    { from: 3, to: 8, value: 6, title: 'National partners', from_label: 'UN Peacebuilding Fund', to_label: 'National Peacebuilding NGOs', description: 'Support for national peacebuilding organizations' },
    { from: 4, to: 7, value: 7, title: 'Regional projects', from_label: 'World Bank', to_label: 'Regional Organizations', description: 'Financing for regional peace initiatives' },
    { from: 5, to: 8, value: 8, title: 'Partnership funding', from_label: 'International NGOs', to_label: 'National Peacebuilding NGOs', description: 'Sub-grants to national partners' },
    { from: 5, to: 9, value: 6, title: 'Local support', from_label: 'International NGOs', to_label: 'Local Peace Committees', description: 'Funding for community peace structures' },
    { from: 5, to: 10, value: 7, title: 'Direct assistance', from_label: 'International NGOs', to_label: 'Conflict-affected Communities', description: 'Services and aid to affected populations' },
    { from: 6, to: 8, value: 7, title: 'Implementation partnership', from_label: 'UN Agencies', to_label: 'National Peacebuilding NGOs', description: 'Project implementation through national partners' },
    { from: 6, to: 10, value: 8, title: 'UN assistance', from_label: 'UN Agencies', to_label: 'Conflict-affected Communities', description: 'Direct UN support to communities' },
    { from: 7, to: 8, value: 6, title: 'Regional to national', from_label: 'Regional Organizations', to_label: 'National Peacebuilding NGOs', description: 'Regional program implementation' },
    { from: 8, to: 9, value: 8, title: 'Local implementation', from_label: 'National Peacebuilding NGOs', to_label: 'Local Peace Committees', description: 'Support to community peace mechanisms' },
    { from: 8, to: 10, value: 9, title: 'Community programs', from_label: 'National Peacebuilding NGOs', to_label: 'Conflict-affected Communities', description: 'Direct services to affected populations' },
    { from: 9, to: 10, value: 9, title: 'Community action', from_label: 'Local Peace Committees', to_label: 'Conflict-affected Communities', description: 'Local peace initiatives benefiting communities' },
    { from: 11, to: 5, value: 4, title: 'Knowledge transfer', from_label: 'Research Institutions', to_label: 'International NGOs', description: 'Research informing program design' },
    { from: 11, to: 1, value: 3, title: 'Policy advice', from_label: 'Research Institutions', to_label: 'Int\'l Donor Governments', description: 'Research informing donor policies' }
  ]
};

// Sample Influence Analysis Network (Global)
const influenceGlobal = {
  nodes: [
    { id: 1, label: 'UN Security Council', group: 1, value: 10, description: 'Primary UN body responsible for international peace and security', connections: ['UN Secretariat', 'Member States', 'Regional Organizations'] },
    { id: 2, label: 'Major Powers', group: 1, value: 9, description: 'Influential state actors with significant resources and capabilities', connections: ['UN Security Council', 'Regional Powers', 'IGOs'] },
    { id: 3, label: 'UN Secretary-General', group: 3, value: 8, description: 'Chief administrative officer of the United Nations', connections: ['UN Security Council', 'UN Agencies', 'Member States'] },
    { id: 4, label: 'Regional Powers', group: 1, value: 7, description: 'States with significant influence in their respective regions', connections: ['Neighboring States', 'Regional Organizations', 'Major Powers'] },
    { id: 5, label: 'Regional Organizations', group: 1, value: 6, description: 'Formal institutions with regional membership and mandate', connections: ['Member States', 'UN System', 'Civil Society'] },
    { id: 6, label: 'International Financial Institutions', group: 1, value: 7, description: 'Multilateral institutions providing financial assistance', connections: ['Donor Countries', 'Recipient Countries', 'Private Sector'] },
    { id: 7, label: 'Media Organizations', group: 2, value: 6, description: 'Global and regional news and information outlets', connections: ['Global Public', 'Political Actors', 'Civil Society'] },
    { id: 8, label: 'Global NGO Networks', group: 2, value: 5, description: 'International civil society organizations and coalitions', connections: ['Donors', 'Local Partners', 'UN System'] },
    { id: 9, label: 'Religious Leaders', group: 2, value: 6, description: 'Influential faith-based actors in peace processes', connections: ['Local Communities', 'Religious Institutions', 'Political Leaders'] },
    { id: 10, label: 'Local Peace Actors', group: 3, value: 4, description: 'Community-level peacebuilders and conflict resolvers', connections: ['Local Communities', 'National NGOs', 'International Supporters'] },
    { id: 11, label: 'Private Sector', group: 4, value: 5, description: 'Business entities operating in conflict-affected regions', connections: ['Governments', 'Local Economy', 'International Markets'] },
    { id: 12, label: 'Academic/Research Community', group: 2, value: 4, description: 'Knowledge producers and policy influencers', connections: ['Policy-makers', 'Universities', 'Think Tanks'] }
  ],
  edges: [
    { from: 1, to: 2, value: 9, title: 'Power dynamics', from_label: 'UN Security Council', to_label: 'Major Powers', description: 'Major powers significantly influence UNSC decisions' },
    { from: 1, to: 3, value: 7, title: 'Institutional relationship', from_label: 'UN Security Council', to_label: 'UN Secretary-General', description: 'Formal authority relationship within UN system' },
    { from: 1, to: 5, value: 6, title: 'Chapter VIII relationship', from_label: 'UN Security Council', to_label: 'Regional Organizations', description: 'UN Charter-based cooperation on regional security' },
    { from: 2, to: 4, value: 8, title: 'Regional influence', from_label: 'Major Powers', to_label: 'Regional Powers', description: 'Major powers exert influence on regional actors' },
    { from: 2, to: 6, value: 8, title: 'Financial control', from_label: 'Major Powers', to_label: 'International Financial Institutions', description: 'Significant influence over financial institution policies' },
    { from: 2, to: 11, value: 7, title: 'Economic relationship', from_label: 'Major Powers', to_label: 'Private Sector', description: 'Corporate interests aligned with major power policies' },
    { from: 3, to: 8, value: 6, title: 'Civil society engagement', from_label: 'UN Secretary-General', to_label: 'Global NGO Networks', description: 'Good offices enabling civil society participation' },
    { from: 3, to: 9, value: 5, title: 'Faith-based diplomacy', from_label: 'UN Secretary-General', to_label: 'Religious Leaders', description: 'Engagement with religious actors on peace' },
    { from: 4, to: 5, value: 8, title: 'Regional leadership', from_label: 'Regional Powers', to_label: 'Regional Organizations', description: 'Disproportionate influence in regional bodies' },
    { from: 4, to: 10, value: 4, title: 'Local intervention', from_label: 'Regional Powers', to_label: 'Local Peace Actors', description: 'Support or interference in local peace efforts' },
    { from: 5, to: 10, value: 5, title: 'Local empowerment', from_label: 'Regional Organizations', to_label: 'Local Peace Actors', description: 'Regional frameworks supporting local initiatives' },
    { from: 6, to: 11, value: 7, title: 'Investment influence', from_label: 'International Financial Institutions', to_label: 'Private Sector', description: 'Financial incentives shaping business activities' },
    { from: 6, to: 4, value: 6, title: 'Economic leverage', from_label: 'International Financial Institutions', to_label: 'Regional Powers', description: 'Financial conditions affecting regional policies' },
    { from: 7, to: 1, value: 5, title: 'Public pressure', from_label: 'Media Organizations', to_label: 'UN Security Council', description: 'Media coverage influencing policy decisions' },
    { from: 7, to: 2, value: 6, title: 'Public opinion', from_label: 'Media Organizations', to_label: 'Major Powers', description: 'Media shaping domestic support for policies' },
    { from: 7, to: 10, value: 4, title: 'Local visibility', from_label: 'Media Organizations', to_label: 'Local Peace Actors', description: 'Media attention amplifying local voices' },
    { from: 8, to: 7, value: 6, title: 'Media engagement', from_label: 'Global NGO Networks', to_label: 'Media Organizations', description: 'Strategic use of media for advocacy' },
    { from: 8, to: 10, value: 7, title: 'Local partnership', from_label: 'Global NGO Networks', to_label: 'Local Peace Actors', description: 'Support empowering local peacebuilders' },
    { from: 8, to: 12, value: 6, title: 'Research collaboration', from_label: 'Global NGO Networks', to_label: 'Academic/Research Community', description: 'Joint knowledge production and policy analysis' },
    { from: 9, to: 10, value: 8, title: 'Community influence', from_label: 'Religious Leaders', to_label: 'Local Peace Actors', description: 'Faith-based leadership in community peace' },
    { from: 9, to: 4, value: 5, title: 'Cultural legitimacy', from_label: 'Religious Leaders', to_label: 'Regional Powers', description: 'Religious legitimation of political actions' },
    { from: 11, to: 10, value: 4, title: 'Local investment', from_label: 'Private Sector', to_label: 'Local Peace Actors', description: 'Corporate support for local stability initiatives' },
    { from: 12, to: 1, value: 3, title: 'Policy advice', from_label: 'Academic/Research Community', to_label: 'UN Security Council', description: 'Expert input informing security decisions' },
    { from: 12, to: 8, value: 5, title: 'Knowledge support', from_label: 'Academic/Research Community', to_label: 'Global NGO Networks', description: 'Research informing advocacy strategies' }
  ]
};

// Sample Trust Relationship Data (Global)
const trustGlobal = {
  nodes: [
    { id: 1, label: 'Government A', group: 1, value: 8, description: 'Major state in conflict situation', connections: ['Diplomatic Partners', 'Regional Allies', 'International Organizations'] },
    { id: 2, label: 'Government B', group: 2, value: 7, description: 'Opposing state in conflict situation', connections: ['Allied States', 'Supportive Non-state Actors', 'Some International Organizations'] },
    { id: 3, label: 'UN Mission', group: 3, value: 6, description: 'United Nations peacekeeping or political mission', connections: ['Security Council', 'Conflict Parties', 'Civil Society'] },
    { id: 4, label: 'Regional Organization', group: 3, value: 5, description: 'Regional body involved in mediation', connections: ['Member States', 'UN System', 'Local Actors'] },
    { id: 5, label: 'International NGOs', group: 3, value: 4, description: 'Non-governmental organizations with presence in conflict area', connections: ['Local Partners', 'Donors', 'Conflict-affected Communities'] },
    { id: 6, label: 'Local Civil Society A', group: 1, value: 6, description: 'Civil society organizations aligned with Group A', connections: ['Government A', 'Communities A', 'Some International NGOs'] },
    { id: 7, label: 'Local Civil Society B', group: 2, value: 5, description: 'Civil society organizations aligned with Group B', connections: ['Government B', 'Communities B', 'Some International NGOs'] },
    { id: 8, label: 'Religious Leaders', group: 3, value: 7, description: 'Faith leaders with moral authority across divides', connections: ['Communities on Both Sides', 'Governments', 'International Faith Networks'] },
    { id: 9, label: 'Business Community', group: 3, value: 4, description: 'Private sector actors with economic interests in stability', connections: ['Both Governments', 'Regional Markets', 'International Investors'] },
    { id: 10, label: 'Neutral Third Country', group: 3, value: 6, description: 'State acting as neutral mediator or host', connections: ['Both Conflict Parties', 'International Organizations', 'Donor Community'] }
  ],
  edges: [
    { from: 1, to: 2, value: 2, title: 'Adversarial relationship', from_label: 'Government A', to_label: 'Government B', description: 'Low trust characterized by suspicion and limited communication' },
    { from: 1, to: 3, value: 6, title: 'Cautious cooperation', from_label: 'Government A', to_label: 'UN Mission', description: 'Moderate trust with formal cooperation but some reservations' },
    { from: 1, to: 4, value: 5, title: 'Regional engagement', from_label: 'Government A', to_label: 'Regional Organization', description: 'Working relationship with occasional tensions' },
    { from: 1, to: 6, value: 8, title: 'Aligned interests', from_label: 'Government A', to_label: 'Local Civil Society A', description: 'High trust based on shared perspective and goals' },
    { from: 1, to: 7, value: 2, title: 'Suspicion', from_label: 'Government A', to_label: 'Local Civil Society B', description: 'Low trust and perception of partisan motives' },
    { from: 1, to: 8, value: 6, title: 'Respectful relationship', from_label: 'Government A', to_label: 'Religious Leaders', description: 'Recognition of moral authority despite some disagreements' },
    { from: 1, to: 9, value: 7, title: 'Economic partnership', from_label: 'Government A', to_label: 'Business Community', description: 'Aligned interests in stability and development' },
    { from: 1, to: 10, value: 5, title: 'Diplomatic relations', from_label: 'Government A', to_label: 'Neutral Third Country', description: 'Formal engagement with moderate trust' },
    { from: 2, to: 3, value: 5, title: 'Conditional cooperation', from_label: 'Government B', to_label: 'UN Mission', description: 'Limited trust with scrutiny of UN actions' },
    { from: 2, to: 4, value: 6, title: 'Regional participation', from_label: 'Government B', to_label: 'Regional Organization', description: 'Engaged relationship with some trust' },
    { from: 2, to: 6, value: 2, title: 'Distrust', from_label: 'Government B', to_label: 'Local Civil Society A', description: 'Perception as agents of opposing side' },
    { from: 2, to: 7, value: 8, title: 'Strong alliance', from_label: 'Government B', to_label: 'Local Civil Society B', description: 'High trust and mutual support' },
    { from: 2, to: 8, value: 5, title: 'Ambivalent respect', from_label: 'Government B', to_label: 'Religious Leaders', description: 'Recognition of influence with some skepticism' },
    { from: 2, to: 9, value: 6, title: 'Pragmatic relationship', from_label: 'Government B', to_label: 'Business Community', description: 'Economic cooperation despite political tensions' },
    { from: 2, to: 10, value: 5, title: 'Cautious dialogue', from_label: 'Government B', to_label: 'Neutral Third Country', description: 'Formal engagement with limited trust' },
    { from: 3, to: 4, value: 8, title: 'Institutional partnership', from_label: 'UN Mission', to_label: 'Regional Organization', description: 'Strong coordination and mutual support' },
    { from: 3, to: 5, value: 7, title: 'Operational cooperation', from_label: 'UN Mission', to_label: 'International NGOs', description: 'Partnership in humanitarian and peace activities' },
    { from: 3, to: 6, value: 6, title: 'Engagement with caution', from_label: 'UN Mission', to_label: 'Local Civil Society A', description: 'Working relationship while maintaining neutrality' },
    { from: 3, to: 7, value: 6, title: 'Balanced engagement', from_label: 'UN Mission', to_label: 'Local Civil Society B', description: 'Equal treatment to maintain credibility' },
    { from: 3, to: 8, value: 7, title: 'Valued partnership', from_label: 'UN Mission', to_label: 'Religious Leaders', description: 'Collaboration on reconciliation initiatives' },
    { from: 3, to: 10, value: 8, title: 'Diplomatic alliance', from_label: 'UN Mission', to_label: 'Neutral Third Country', description: 'Strong cooperation in mediation efforts' },
    { from: 4, to: 5, value: 7, title: 'Regional cooperation', from_label: 'Regional Organization', to_label: 'International NGOs', description: 'Partnership on peace programs' },
    { from: 4, to: 10, value: 8, title: 'Mediation partnership', from_label: 'Regional Organization', to_label: 'Neutral Third Country', description: 'Coordinated diplomatic initiatives' },
    { from: 5, to: 6, value: 6, title: 'Program partnership', from_label: 'International NGOs', to_label: 'Local Civil Society A', description: 'Project implementation with monitoring' },
    { from: 5, to: 7, value: 6, title: 'Balanced support', from_label: 'International NGOs', to_label: 'Local Civil Society B', description: 'Neutral engagement with all parties' },
    { from: 5, to: 8, value: 7, title: 'Values alignment', from_label: 'International NGOs', to_label: 'Religious Leaders', description: 'Shared commitment to reconciliation' },
    { from: 6, to: 7, value: 3, title: 'Civil society divide', from_label: 'Local Civil Society A', to_label: 'Local Civil Society B', description: 'Limited trust reflecting broader conflict' },
    { from: 6, to: 8, value: 6, title: 'Moral respect', from_label: 'Local Civil Society A', to_label: 'Religious Leaders', description: 'Recognition of bridge-building potential' },
    { from: 7, to: 8, value: 6, title: 'Faith engagement', from_label: 'Local Civil Society B', to_label: 'Religious Leaders', description: 'Respect for peacebuilding efforts' },
    { from: 8, to: 9, value: 7, title: 'Community influence', from_label: 'Religious Leaders', to_label: 'Business Community', description: 'Moral authority affecting business decisions' },
    { from: 9, to: 10, value: 7, title: 'Business diplomacy', from_label: 'Business Community', to_label: 'Neutral Third Country', description: 'Economic ties supporting diplomatic role' }
  ]
};

// Generate placeholder data for regional views
// You would replace these with actual data for each region
const formalInformalAfrica = { 
  nodes: formalInformalGlobal.nodes.slice(0, 8),  // Simplified subset
  edges: formalInformalGlobal.edges.filter(e => e.from <= 8 && e.to <= 8)
};

const formalInformalLatinAmerica = {
  nodes: formalInformalGlobal.nodes.slice(2, 10), // Simplified subset
  edges: formalInformalGlobal.edges.filter(e => e.from >= 2 && e.from <= 10 && e.to >= 2 && e.to <= 10)
};

const formalInformalSouthAsia = {
  nodes: [
    ...formalInformalMiddleEast.nodes.slice(0, 4),
    ...formalInformalMiddleEast.nodes.slice(6, 10)
  ],
  edges: formalInformalMiddleEast.edges.filter(e => 
    ((e.from <= 4 || (e.from >= 7 && e.from <= 10)) && 
     (e.to <= 4 || (e.to >= 7 && e.to <= 10)))
  )
};

// Create placeholder data for other regional views
const resourceFlowAfrica = {
  nodes: resourceFlowGlobal.nodes.slice(0, 9),
  edges: resourceFlowGlobal.edges.filter(e => e.from <= 9 && e.to <= 9)
};

const resourceFlowMiddleEast = {
  nodes: resourceFlowGlobal.nodes.slice(2, 11),
  edges: resourceFlowGlobal.edges.filter(e => e.from >= 2 && e.from <= 11 && e.to >= 2 && e.to <= 11)
};

const resourceFlowSouthAsia = {
  nodes: resourceFlowGlobal.nodes.slice(1, 10),
  edges: resourceFlowGlobal.edges.filter(e => e.from >= 1 && e.from <= 10 && e.to >= 1 && e.to <= 10)
};

const resourceFlowLatinAmerica = {
  nodes: resourceFlowGlobal.nodes.slice(3, 11),
  edges: resourceFlowGlobal.edges.filter(e => e.from >= 3 && e.from <= 11 && e.to >= 3 && e.to <= 11)
};

const influenceAfrica = {
  nodes: influenceGlobal.nodes.slice(0, 10),
  edges: influenceGlobal.edges.filter(e => e.from <= 10 && e.to <= 10)
};

const influenceMiddleEast = {
  nodes: influenceGlobal.nodes.slice(1, 11),
  edges: influenceGlobal.edges.filter(e => e.from >= 1 && e.from <= 11 && e.to >= 1 && e.to <= 11)
};

const influenceSouthAsia = {
  nodes: influenceGlobal.nodes.slice(2, 12),
  edges: influenceGlobal.edges.filter(e => e.from >= 2 && e.from <= 12 && e.to >= 2 && e.to <= 12)
};

const influenceLatinAmerica = {
  nodes: influenceGlobal.nodes.slice(3, 12),
  edges: influenceGlobal.edges.filter(e => e.from >= 3 && e.from <= 12 && e.to >= 3 && e.to <= 12)
};

const trustAfrica = {
  nodes: trustGlobal.nodes.slice(0, 8),
  edges: trustGlobal.edges.filter(e => e.from <= 8 && e.to <= 8)
};

const trustMiddleEast = {
  nodes: trustGlobal.nodes.slice(1, 9),
  edges: trustGlobal.edges.filter(e => e.from >= 1 && e.from <= 9 && e.to >= 1 && e.to <= 9)
};

const trustSouthAsia = {
  nodes: trustGlobal.nodes.slice(2, 10),
  edges: trustGlobal.edges.filter(e => e.from >= 2 && e.from <= 10 && e.to >= 2 && e.to <= 10)
};

const trustLatinAmerica = {
  nodes: trustGlobal.nodes.slice(0, 2).concat(trustGlobal.nodes.slice(4, 10)),
  edges: trustGlobal.edges.filter(e => 
    ((e.from <= 2 || (e.from >= 5 && e.from <= 10)) && 
     (e.to <= 2 || (e.to >= 5 && e.to <= 10)))
  )
};
