import React from 'react'
import { getData } from '@/lib/axios'
import Services from './Services'

const ServicesWrapper = async () => {
  const response:any = await getData("/api/service/list")
  const services = response.data || []
  
  return <Services services={services} />
}

export default ServicesWrapper