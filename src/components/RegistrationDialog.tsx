import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import gsap from 'gsap';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { submitRegistration, type RegistrationData } from '@/lib/registrations';
import { Loader2 } from 'lucide-react';

const registrationSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    college: z.string().min(2, 'College/Institution name is required'),
    year_of_study: z.string().min(1, 'Please select your year of study'),
    team_size: z.string().min(1, 'Please select team size preference'),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface RegistrationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    eventName?: string;
}

export function RegistrationDialog({ open, onOpenChange, eventName }: RegistrationDialogProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<RegistrationFormData>({
        resolver: zodResolver(registrationSchema),
    });

    const yearOfStudy = watch('year_of_study');
    const teamSize = watch('team_size');

    // GSAP animations for form elements
    useEffect(() => {
        if (open && formRef.current && titleRef.current) {
            const ctx = gsap.context(() => {
                // Title animation
                gsap.fromTo(
                    titleRef.current,
                    { opacity: 0, y: -20, scale: 0.9 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
                );

                // Form fields stagger animation
                gsap.fromTo(
                    '.form-field',
                    { opacity: 0, x: -20 },
                    { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
                );

                // Button animation
                gsap.fromTo(
                    '.submit-button',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, delay: 0.8, ease: 'back.out(1.7)' }
                );
            }, formRef);

            return () => ctx.revert();
        }
    }, [open]);

    const onSubmit = async (data: RegistrationFormData) => {
        setIsSubmitting(true);

        const registrationData: RegistrationData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            college: data.college,
            year_of_study: data.year_of_study,
            team_size: data.team_size,
            event_name: eventName || 'General Registration',
        };

        const result = await submitRegistration(registrationData);

        setIsSubmitting(false);

        if (result.success) {
            toast({
                title: '🎉 Registration Successful!',
                description: result.message,
                variant: 'default',
            });
            reset();
            onOpenChange(false);
        } else {
            toast({
                title: '❌ Registration Failed',
                description: result.message,
                variant: 'destructive',
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] bg-zinc-900/95 backdrop-blur-xl border-2 border-crimson/30 text-foreground overflow-y-auto max-h-[90vh]">
                {/* Reddish light background effects */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
                    <div
                        className="absolute top-0 left-1/4 w-64 h-64 bg-crimson/10 rounded-full blur-3xl animate-pulse"
                        style={{ animationDuration: '3s' }}
                    />
                    <div
                        className="absolute bottom-0 right-1/4 w-80 h-80 bg-crimson/15 rounded-full blur-3xl animate-pulse"
                        style={{ animationDuration: '4s', animationDelay: '1s' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-crimson/5 via-transparent to-crimson/5" />
                </div>

                <DialogHeader className="relative z-10">
                    <DialogTitle
                        ref={titleRef}
                        className="text-3xl md:text-4xl font-kraken text-center mb-2 tracking-wider"
                        style={{
                            textShadow: '0 0 20px hsl(0 100% 50% / 0.5), 0 0 40px hsl(0 100% 50% / 0.3)',
                        }}
                    >
                        <span className="text-foreground">JOIN THE </span>
                        <span className="text-crimson">REVOLUTION</span>
                    </DialogTitle>
                    <DialogDescription className="text-center text-muted-foreground font-horror text-base">
                        {eventName ? `Register for ${eventName}` : 'Register for upcoming events'}
                    </DialogDescription>
                </DialogHeader>

                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6 relative z-10">
                    {/* Name Field */}
                    <div className="form-field space-y-2">
                        <Label htmlFor="name" className="text-foreground font-empire text-sm tracking-wide">
                            Full Name *
                        </Label>
                        <Input
                            id="name"
                            {...register('name')}
                            placeholder="Enter your full name"
                            className="bg-black/40 border-crimson/30 focus:border-crimson text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 focus:shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                        />
                        {errors.name && (
                            <p className="text-crimson text-xs font-horror">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="form-field space-y-2">
                        <Label htmlFor="email" className="text-foreground font-empire text-sm tracking-wide">
                            Email Address *
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            {...register('email')}
                            placeholder="your.email@example.com"
                            className="bg-black/40 border-crimson/30 focus:border-crimson text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 focus:shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                        />
                        {errors.email && (
                            <p className="text-crimson text-xs font-horror">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Phone Field */}
                    <div className="form-field space-y-2">
                        <Label htmlFor="phone" className="text-foreground font-empire text-sm tracking-wide">
                            Phone Number *
                        </Label>
                        <Input
                            id="phone"
                            type="tel"
                            {...register('phone')}
                            placeholder="+91 1234567890"
                            className="bg-black/40 border-crimson/30 focus:border-crimson text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 focus:shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                        />
                        {errors.phone && (
                            <p className="text-crimson text-xs font-horror">{errors.phone.message}</p>
                        )}
                    </div>

                    {/* College Field */}
                    <div className="form-field space-y-2">
                        <Label htmlFor="college" className="text-foreground font-empire text-sm tracking-wide">
                            College/Institution *
                        </Label>
                        <Input
                            id="college"
                            {...register('college')}
                            placeholder="Your college or institution name"
                            className="bg-black/40 border-crimson/30 focus:border-crimson text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 focus:shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                        />
                        {errors.college && (
                            <p className="text-crimson text-xs font-horror">{errors.college.message}</p>
                        )}
                    </div>

                    {/* Year of Study Field */}
                    <div className="form-field space-y-2">
                        <Label htmlFor="year_of_study" className="text-foreground font-empire text-sm tracking-wide">
                            Year of Study *
                        </Label>
                        <Select value={yearOfStudy} onValueChange={(value) => setValue('year_of_study', value)}>
                            <SelectTrigger className="bg-black/40 border-crimson/30 focus:border-crimson text-foreground transition-all duration-300 focus:shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                                <SelectValue placeholder="Select your year" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-crimson/30">
                                <SelectItem value="1st Year">1st Year</SelectItem>
                                <SelectItem value="2nd Year">2nd Year</SelectItem>
                                <SelectItem value="3rd Year">3rd Year</SelectItem>
                                <SelectItem value="4th Year">4th Year</SelectItem>
                                <SelectItem value="Graduate">Graduate</SelectItem>
                                <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.year_of_study && (
                            <p className="text-crimson text-xs font-horror">{errors.year_of_study.message}</p>
                        )}
                    </div>

                    {/* Team Size Field */}
                    <div className="form-field space-y-2">
                        <Label htmlFor="team_size" className="text-foreground font-empire text-sm tracking-wide">
                            Team Size Preference *
                        </Label>
                        <Select value={teamSize} onValueChange={(value) => setValue('team_size', value)}>
                            <SelectTrigger className="bg-black/40 border-crimson/30 focus:border-crimson text-foreground transition-all duration-300 focus:shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                                <SelectValue placeholder="Select team size" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-crimson/30">
                                <SelectItem value="Solo">Solo (Individual)</SelectItem>
                                <SelectItem value="2-3 Members">2-3 Members</SelectItem>
                                <SelectItem value="4-5 Members">4-5 Members</SelectItem>
                                <SelectItem value="6+ Members">6+ Members</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.team_size && (
                            <p className="text-crimson text-xs font-horror">{errors.team_size.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="submit-button w-full bg-crimson hover:bg-crimson/90 text-white font-stranger text-lg py-6 tracking-[0.15em] transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                SUBMITTING...
                            </>
                        ) : (
                            'SUBMIT REGISTRATION'
                        )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground font-horror">
                        * All fields are required
                    </p>
                </form>

                {/* Corner decorations */}
                <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-crimson/30 pointer-events-none" />
                <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-crimson/30 pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-crimson/30 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-crimson/30 pointer-events-none" />
            </DialogContent>
        </Dialog>
    );
}
