export default function Success() {
  const stories = [
    {
      title: "Faster Diagnosis",
      quote: "Reduced our diagnostic time from hours to minutes, allowing us to treat patients faster.",
      author: "Emergency Department Head",
      icon: "👍",
    },
    {
      title: "Improved Accuracy",
      quote: "The AI caught subtle abnormalities that might have been missed in routine screening.",
      author: "Senior Radiologist",
      icon: "🏅",
    },
    {
      title: "Better Outcomes",
      quote: "Early detection capabilities have improved patient outcomes in our department.",
      author: "Neurology Department",
      icon: "💬",
    },
  ];

  return (
    <div className="bg-gray-100 py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-2">Success Stories</h2>
      <p className="text-center text-gray-600 mb-8">
        Real impact from real medical professionals
      </p>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {stories.map((story, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow text-center">
            <div className="text-3xl mb-2">{story.icon}</div>
            <h3 className="font-semibold text-lg">{story.title}</h3>
            <p className="text-sm mt-2 text-gray-700">"{story.quote}"</p>
            <p className="text-sm mt-2 text-blue-500 font-medium">– {story.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
