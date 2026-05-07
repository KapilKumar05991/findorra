import { Check, ChevronRight, Clock, MapPin, PlusCircle, Rocket, Search, ShieldCheck, Star, Store, Target } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Split Design */}
      <section className="container mx-auto p-4 md:px-12 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-sm font-semibold text-primary bg-primary/10 px-4 py-2 rounded-full">
                About Findorra
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Discover Local Businesses with{" "}
              <span className="text-primary">AI-Powered Search</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              We're transforming how millions of Indians find and connect with
              trusted local businesses. From restaurants to hospitals, education
              to real estate - discover verified businesses near you.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
              >
                <Search className="w-5 h-5" />
                Start Searching
              </Link>
              <Link
                href="/free-listing"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 rounded-lg font-semibold hover:bg-gray-900 dark:hover:bg-gray-100 hover:text-white dark:hover:text-gray-900 transition-all"
              >
                Add Your Business
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div>
                <div className="text-2xl md:text-3xl font-bold">10M+</div>
                <div className="text-sm text-muted-foreground">Users</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold">500K+</div>
                <div className="text-sm text-muted-foreground">Businesses</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold">100+</div>
                <div className="text-sm text-muted-foreground">Cities</div>
              </div>
            </div>
          </div>

          {/* Right - Colorful Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Blue Card */}
            <div className="bg-gradient-to-br from-[#31C0FF] to-[#0669B1] p-6 rounded-2xl text-white space-y-3 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Verified Businesses</h3>
              <p className="text-white/90 text-sm">
                All listings are verified for accuracy and trust
              </p>
            </div>

            {/* Green Card */}
            <div className="bg-gradient-to-br from-[#5DE3AD] to-[#17B877] p-6 rounded-2xl text-white space-y-3 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Hyperlocal</h3>
              <p className="text-white/90 text-sm">
                Find businesses in your exact neighborhood
              </p>
            </div>

            {/* Purple Card */}
            <div className="bg-gradient-to-br from-[#B89CFF] to-[#8964E8] p-6 rounded-2xl text-white space-y-3 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Real Reviews</h3>
              <p className="text-white/90 text-sm">
                Genuine ratings from verified customers
              </p>
            </div>

            {/* Orange Card */}
            <div className="bg-gradient-to-br from-[#FF9A62] to-[#FF6B35] p-6 rounded-2xl text-white space-y-3 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">All Categories</h3>
              <p className="text-white/90 text-sm">
                From food to healthcare, we cover it all
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto p-4 md:px-12">
          <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-[#31C0FF] to-[#0669B1] rounded-xl flex items-center justify-center">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To revolutionize local business discovery in India by leveraging
                AI technology, making it easier for people to find trusted,
                verified businesses in their neighborhood. We bridge the gap
                between local businesses and customers.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-[#B89CFF] to-[#8964E8] rounded-xl flex items-center justify-center">
                <PlusCircle className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To become India's most trusted and comprehensive local search
                platform, empowering every citizen to make informed decisions
                about local services. We envision a future where finding the
                right business is instant and personalized.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto p-4 md:px-12 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Story</h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Findorra was born from a simple observation: finding reliable
              local businesses in India was unnecessarily complicated.
              Traditional directories were outdated, search results were
              unreliable, and people had to rely on word-of-mouth
              recommendations.
            </p>
            <p>
              We set out to change this by building an AI-powered platform that
              not only lists businesses but verifies them, understands user
              intent, and provides personalized recommendations. Our technology
              analyzes millions of data points to ensure you always find the
              best match for your needs.
            </p>
            <p>
              Today, Findorra serves millions of users across India, helping
              them discover everything from restaurants and hotels to hospitals,
              educational institutions, and professional services. We're proud
              to support local businesses in reaching their customers and
              growing their presence.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto p-4 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why Choose Findorra?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We combine cutting-edge technology with local expertise to
                deliver the best search experience
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <ShieldCheck className="w-8 h-8" />,
                  color: "from-[#31C0FF] to-[#0669B1]",
                  title: "Verified Businesses",
                  description:
                    "Every business is verified to ensure you connect with legitimate, trustworthy services with accurate information.",
                },
                {
                  icon: <MapPin className="w-8 h-8" />,
                  color: "from-[#5DE3AD] to-[#17B877]",
                  title: "Hyperlocal Results",
                  description:
                    "Find businesses in your exact neighborhood with precise location-based AI-powered search technology.",
                },
                {
                  icon: <Clock className="w-8 h-8" />,
                  color: "from-[#FF9A62] to-[#FF6B35]",
                  title: "Real-time Updates",
                  description:
                    "Get the latest information with our constantly updated database ensuring accuracy and reliability.",
                },
                {
                  icon: <Star className="w-8 h-8" />,
                  color: "from-[#B89CFF] to-[#8964E8]",
                  title: "Genuine Reviews",
                  description:
                    "Real customer reviews and ratings to help you make informed decisions about the services you choose.",
                },
                {
                  icon: <Rocket className="w-8 h-8" />,
                  color: "from-[#31C0FF] to-[#0669B1]",
                  title: "AI-Powered Search",
                  description:
                    "Our advanced AI understands your needs and delivers the most relevant results instantly and accurately.",
                },
                {
                  icon: <Store className="w-8 h-8" />,
                  color: "from-[#5DE3AD] to-[#17B877]",
                  title: "Comprehensive Coverage",
                  description:
                    "Access millions of businesses across 100+ cities in India covering all major service categories.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-card border border-border p-6 rounded-xl hover:shadow-lg hover:border-primary/50 transition-all group"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 text-white`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="container mx-auto p-4 md:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                number: "10M+",
                label: "Active Users",
                sublabel: "Trust Findorra daily",
                color: "from-[#31C0FF] to-[#0669B1]",
              },
              {
                number: "500K+",
                label: "Verified Businesses",
                sublabel: "Across India",
                color: "from-[#5DE3AD] to-[#17B877]",
              },
              {
                number: "100+",
                label: "Cities Covered",
                sublabel: "And growing",
                color: "from-[#B89CFF] to-[#8964E8]",
              },
              {
                number: "50M+",
                label: "Monthly Searches",
                sublabel: "Helping people find services",
                color: "from-[#FF9A62] to-[#FF6B35]",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div
                  className={`text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                >
                  {stat.number}
                </div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto p-4 md:px-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              How Findorra Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Search for What You Need",
                  description:
                    "Enter what you're looking for and your location. Our AI understands your query and finds the most relevant businesses.",
                  color: "from-[#31C0FF] to-[#0669B1]",
                },
                {
                  step: "02",
                  title: "Browse Verified Results",
                  description:
                    "Get a list of verified businesses with complete details including contact info, address, ratings, and genuine reviews.",
                  color: "from-[#5DE3AD] to-[#17B877]",
                },
                {
                  step: "03",
                  title: "Connect & Engage",
                  description:
                    "Contact businesses directly, read reviews, and make informed decisions about the services you choose.",
                  color: "from-[#B89CFF] to-[#8964E8]",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`text-7xl font-bold bg-gradient-to-br ${item.color} bg-clip-text text-transparent mb-4 opacity-20`}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto p-4 md:px-12 py-16">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20 rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Discover Local Businesses?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join millions of users who trust Findorra for finding the best local
            services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-semibold text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl"
            >
              <Search className="w-5 h-5" />
              Start Searching Now
            </Link>
            <Link
              href="/free-listing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 rounded-lg font-semibold text-lg hover:bg-gray-900 dark:hover:bg-gray-100 hover:text-white dark:hover:text-gray-900 transition-all"
            >
              List Your Business Free
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
