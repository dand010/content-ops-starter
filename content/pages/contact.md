---
type: PageLayout
title: Get in touch - Contact NepCoffee
sections:
  - type: GenericSection
    title:
      type: TitleBlock
      text: Get in Touch with NepCoffee
      color: text-dark
    subtitle: >-
      We’re here to help you bring the world’s best coffee to your customers or
      home. Reach out to us for inquiries, orders, or partnership opportunities.
    text: >
      *   Address: NepCoffee, Jawalakhel, Lalitpur, Nepal


      *   Email: <info@nep.coffee>


      *   Website: [www.nep.coffee](https://www.nep.coffee)


      **Business Hours:**



      Monday–Friday: 9:00 AM–6:00 PM

      Closed on Saturday & Sundays


      **Interested in Wholesale?**



      Contact our sales team at info(at)nep.coffee to discuss bulk orders,
      custom blends, or exclusive partnerships.
    actions: []
    media:
      type: FormBlock
      fields:
        - type: TextFormControl
          name: name
          label: Name
          hideLabel: true
          placeholder: Your name
          isRequired: true
          width: full
        - type: EmailFormControl
          name: email
          label: Email
          hideLabel: true
          placeholder: Your email
          isRequired: true
          width: full
        - type: TextareaFormControl
          name: message
          label: Message
          hideLabel: true
          placeholder: Your message
          width: full
      submitButton:
        type: SubmitButtonFormControl
        label: Submit
        icon: arrowRight
        iconPosition: right
        style: primary
      elementId: contact-form
      styles:
        self:
          padding:
            - pt-6
            - pb-6
            - pl-6
            - pr-6
          borderColor: border-dark
          borderStyle: solid
          borderWidth: 1
          borderRadius: large
    badge:
      type: Badge
      label: Contact Us
      color: text-primary
    colors: bg-light-fg-dark
slug: contact
isDraft: false
seo:
  type: Seo
  metaTitle: Landing Page
  metaDescription: Write here your new page's description including most relevant keywords.
  addTitleSuffix: true
  socialImage: /images/main-hero.jpg
  metaTags: []
---
