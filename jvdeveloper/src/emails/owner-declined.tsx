import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface OwnerDeclinedEmailProps {
  firstName: string
  address: string
  score: number
}

export const OwnerDeclinedEmail = ({
  firstName = 'Property Owner',
  address = 'Your Property',
  score = 45,
}: OwnerDeclinedEmailProps) => (
  <Html>
    <Head />
    <Preview>About your JVDeveloper application</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={headerTitle}>Application Update</Heading>
        </Section>

        <Section style={content}>
          <Heading style={h1}>Hi {firstName},</Heading>
          
          <Text style={text}>
            Thank you for your interest in JVDeveloper and for submitting your property at <strong>{address}</strong>.
          </Text>

          <Text style={text}>
            After careful review, your property received a score of {score}/100. Based on our current development criteria, we're unable to move forward with this property at this time.
          </Text>

          <Text style={text}>
            However, our team will still contact you to discuss alternative options and potential future opportunities as our criteria and market conditions evolve.
          </Text>

          <Text style={text}>
            We appreciate your interest and encourage you to stay in touch for future opportunities.
          </Text>

          <Section style={disclaimer}>
            <Text style={disclaimerText}>
              <strong>Important:</strong> Real estate investments carry risk. Timelines/approvals/returns are not guaranteed.
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
  background: 'linear-gradient(135deg, #6b7280, #4b5563)',
  color: 'white',
  padding: '32px',
  textAlign: 'center' as const,
  borderRadius: '10px 10px 0 0',
}

const headerTitle = {
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0',
  color: 'white',
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

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px 0',
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

export default OwnerDeclinedEmail