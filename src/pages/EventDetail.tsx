
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Share2, Trophy, Users, Clock, HelpCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { events } from '@/data/events';
import { useEffect, useState } from 'react';
import { RegistrationDialog } from '@/components/RegistrationDialog';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";


const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const event = events.find(e => e.id === id);
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!event) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
                <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
                <Button onClick={() => navigate('/')}>Return Home</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Hero Image */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-10" />
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />

                <div className="absolute top-6 left-6 z-20">
                    <Button
                        variant="outline"
                        onClick={() => navigate('/')}
                        className="bg-background/20 backdrop-blur-md border-white/10 hover:bg-background/40 text-white"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
                    </Button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-40 relative z-20">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Header Card */}
                        <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                            <span className="bg-crimson/90 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6 inline-block">
                                {event.category}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold font-stranger text-white mb-4 leading-tight">{event.title}</h1>
                            <p className="text-xl text-muted-foreground">{event.shortDescription}</p>

                            <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-white/10">
                                <div className="flex items-center gap-3">
                                    <Calendar className="text-crimson w-5 h-5" />
                                    <span className="text-gray-300">{event.date}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="text-crimson w-5 h-5" />
                                    <span className="text-gray-300">{event.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-8">
                            <h2 className="text-2xl font-bold mb-4 font-['Kraken'] tracking-wide border-b border-white/10 pb-2">ABOUT THE EVENT</h2>
                            <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
                                {event.description}
                            </p>
                        </div>

                        {/* Highlights / Phases */}
                        {event.highlights && (
                            <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-8">
                                <h2 className="text-2xl font-bold mb-6 font-['Kraken'] tracking-wide border-b border-white/10 pb-2">HIGHLIGHTS</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {event.highlights.map((highlight, idx) => (
                                        <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center gap-3 hover:bg-white/10 transition-colors">
                                            <CheckCircle className="text-crimson w-5 h-5 flex-shrink-0" />
                                            <span className="text-lg font-medium">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Prizes Section */}
                        {event.prizes && (
                            <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-8">
                                <h2 className="text-2xl font-bold mb-6 font-['Kraken'] tracking-wide border-b border-white/10 pb-2 flex items-center gap-2">
                                    <Trophy className="text-yellow-500" /> PRIZES
                                </h2>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    {event.prizes.map((prize, idx) => (
                                        <div key={idx} className="bg-gradient-to-b from-white/10 to-transparent p-6 rounded-2xl border border-white/10 text-center relative overflow-hidden group">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-crimson to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                                            <div className="text-3xl font-bold text-white mb-2">{prize.amount}</div>
                                            <div className="text-crimson font-stranger text-xl mb-2">{prize.title}</div>
                                            <div className="text-xs text-gray-400">{prize.description}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* FAQs Section */}
                        {event.faqs && (
                            <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-8">
                                <h2 className="text-2xl font-bold mb-6 font-['Kraken'] tracking-wide border-b border-white/10 pb-2 flex items-center gap-2">
                                    <HelpCircle className="text-blue-400" /> FAQs
                                </h2>
                                <Accordion type="single" collapsible className="w-full">
                                    {event.faqs.map((faq, idx) => (
                                        <AccordionItem key={idx} value={`item-${idx}`} className="border-white/10">
                                            <AccordionTrigger className="text-left text-lg font-medium hover:text-crimson transition-colors">
                                                {faq.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-gray-300 leading-relaxed">
                                                {faq.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-6">
                        {/* Registration Card */}
                        <div className="bg-zinc-900/90 backdrop-blur-xl border border-crimson/30 rounded-3xl p-6 shadow-2xl sticky top-24">
                            <h3 className="text-xl font-bold mb-4 font-['Kraken'] text-center">REGISTRATION</h3>

                            <div className="space-y-4 mb-6">
                                {event.teamSize && (
                                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                                        <span className="text-muted-foreground flex items-center gap-2"><Users size={16} /> Team Size</span>
                                        <span className="font-semibold">{event.teamSize}</span>
                                    </div>
                                )}
                                {event.registrationFee && (
                                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                                        <span className="text-muted-foreground">Registration Fee</span>
                                        <span className="font-semibold text-green-400">{event.registrationFee}</span>
                                    </div>
                                )}
                                {event.eligibility && (
                                    <div className="py-2 border-b border-white/10">
                                        <span className="text-muted-foreground block mb-1">Eligibility</span>
                                        <span className="font-semibold text-sm">{event.eligibility}</span>
                                    </div>
                                )}
                            </div>

                            <Button
                                onClick={() => setIsRegistrationOpen(true)}
                                className="w-full bg-crimson hover:bg-crimson/90 text-white text-lg py-6 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.7)] transition-all"
                            >
                                Apply Now
                            </Button>

                            <p className="text-xs text-center text-muted-foreground mt-4">
                                *Limited seats available. Registration closes soon.
                            </p>
                        </div>

                        {/* Sponsors/Partners Mini Section */}
                        {event.sponsors && (
                            <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-6 text-center">
                                <h3 className="text-lg font-bold mb-4">Event Partners</h3>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {event.sponsors.map((sponsor, idx) => (
                                        <div key={idx} className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold" title={sponsor.name}>
                                            {sponsor.logo}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* More Events Section */}
                <div className="mt-20 pt-10 border-t border-white/10">
                    <h2 className="text-3xl font-bold mb-8 font-['Kraken']">MORE EVENTS</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {events.filter(e => e.id !== event.id).slice(0, 3).map((e) => (
                            <div
                                key={e.id}
                                onClick={() => navigate(`/event/${e.id}`)}
                                className="group bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-white/20 transition-all"
                            >
                                <div className="h-40 overflow-hidden">
                                    <img src={e.image} alt={e.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-1 group-hover:text-crimson transition-colors">{e.title}</h3>
                                    <p className="text-sm text-muted-foreground">{e.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Registration Dialog */}
            <RegistrationDialog
                open={isRegistrationOpen}
                onOpenChange={setIsRegistrationOpen}
                eventName={event?.title}
            />
        </div>
    );
};

export default EventDetail;
