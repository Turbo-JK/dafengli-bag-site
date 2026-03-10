import { redirect } from 'next/navigation'

export default function RootPage() {
  // Redirect to default locale - middleware will handle this but this is a fallback
  redirect('/zh')
}
