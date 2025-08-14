import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface OwnerWelcomeEmailProps {
  firstName: string
  address: string
  score: number
}

export const OwnerWelcomeEmail = ({
  firstName = 'Property Owner',
  address = 'Your Property',
  score = 75,
}: OwnerWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to JVDeveloper — Your Partner in Property Profits</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={headerTitle}>Welcome to JVDeveloper</Heading>
          <Text style={headerSubtitle}>Your Partner in Property Profits</Text>
        </Section>

        <Section style={content}>
          <Heading style={h1}>Hi {firstName}, great news!</Heading>
          
          <Text style={text}>
            Your property at <strong>{address}</strong> qualifies for our JV program with a score of {score}/100.
          </Text>

          <Section style={dualSection}>
            <Section style={homeownerSection}>
              <Heading style={sectionTitle}>For Homeowners</Heading>
              <Text style={sectionText}>
                We turn your property into a high-value development. You keep ownership during the process — we raise capital, build, and sell. All you do is collect your share of the profit.
              </Text>
            </Section>
            
            <Section style={investorSection}>
              <Heading style={sectionTitle}>For Experienced Owners</Heading>
              <Text style={sectionText}>
                Our experienced JV team manages every phase — from capital stack to construction oversight — ensuring professional execution and maximum value.
              </Text>
            </Section>
          </Section>

          <Section style={ctaSection}>
            <Button style={ctaButton} href={`${process.env.NEXTAUTH_URL}/dashboard/owner`}>
              Log In and Get Started
            </Button>
          </Section>

          <Heading style={h2}>What happens next:</Heading>
          <Text style={text}>
            <strong>1. JV Agreement Review</strong> - We'll send your personalized agreement within 24 hours<br/>
            <strong>2. Market Analysis</strong> - Our team will complete a detailed feasibility study<br/>
            <strong>3. Capital Raising</strong> - We begin securing investor funding for your project<br/>
            <strong>4. Development Launch</strong> - Permits, construction, and project management begin<br/>
            <strong>5. Profit Distribution</strong> - You receive your share upon successful completion
          </Text>

          <Section style={disclaimer}>
            <Text style={disclaimerText}>
              <strong>Important:</strong> Real estate investments carry risk. Timelines/approvals/returns are not guaranteed. Exit is a sale upon completion; JVDeveloper controls listing agent, pricing, and timing to ensure investor cost recovery before profit distribution.
            </Text>
          </Section>
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            Questions? Contact us at info@jvdeveloper.com or (555) 123-4567<br/>
            JVDeveloper | 123 Business Ave, Suite 100, Austin, TX 78701
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const header = {
  background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
  color: 'white',
  padding: '32px',
  textAlign: 'center' as const,
  borderRadius: '10px 10px 0 0',
}

const headerTitle = {
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
  color: 'white',
}

const headerSubtitle = {
  fontSize: '18px',
  margin: '0',
  color: 'white',
  opacity: 0.9,
}

const content = {
  padding: '32px',
}

const h1 = {
  color: '#1e40af',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
}

const h2 = {
  color: '#1e40af',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '24px 0 16px 0',
}

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px 0',
}

const dualSection = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
  margin: '24px 0',
}

const homeownerSection = {
  background: '#f0fdf4',
  padding: '16px',
  borderRadius: '8px',
  borderLeft: '3px solid #10b981',
}

const investorSection = {
  background: '#f3f4f6',
  padding: '16px',
  borderRadius: '8px',
  borderLeft: '3px solid #8b5cf6',
}

const sectionTitle = {
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
  color: '#1e40af',
}

const sectionText = {
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
  color: '#374151',
}

const ctaSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const ctaButton = {
  backgroundColor: '#f59e0b',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
}

const disclaimer = {
  background: '#fef3c7',
  padding: '16px',
  borderLeft: '4px solid #f59e0b',
  margin: '24px 0',
  borderRadius: '8px',
}

const disclaimerText = {
  fontSize: '14px',
  color: '#92400e',
  margin: '0',
}

const footer = {
  background: '#f8fafc',
  padding: '16px',
  borderRadius: '0 0 10px 10px',
}

const footerText = {
  fontSize: '14px',
  color: '#6b7280',
  textAlign: 'center' as const,
  margin: '0',
}

export default OwnerWelcomeEmail