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

interface OwnerReviewEmailProps {
  firstName: string
  address: string
  score: number
}

export const OwnerReviewEmail = ({
  firstName = 'Property Owner',
  address = 'Your Property',
  score = 65,
}: OwnerReviewEmailProps) => (
  <Html>
    <Head />
    <Preview>Thanks — we're reviewing your property</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={headerTitle}>Application Under Review</Heading>
        </Section>

        <Section style={content}>
          <Heading style={h1}>Hi {firstName},</Heading>
          
          <Text style={text}>
            Thank you for submitting your property at <strong>{address}</strong> for our JV development program.
          </Text>

          <Text style={text}>
            Your property received a preliminary score of {score}/100 and requires additional review by our underwriting team.
          </Text>

          <Text style={text}>
            Our team will contact you within 24-48 hours to discuss your options and potential pathways to qualification.
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
  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
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

export default OwnerReviewEmail