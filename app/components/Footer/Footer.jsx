import { Grid, Typography,Button } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <div>
            <Grid className="bg-black text-white text-center mt-6"
                container
                sx={{ bgcolor: "black", color: 'white', py: 3 }}
            >
                <Grid xs={12} sm={6} md={3}>
                    <Typography className='pb-3 ' variant='h6'>Company</Typography>
                    <div>
                        <Button className='pb-2 text-sm font-normal text-center items-start' variant='h7' >About</Button>
                    </div>
                    <div>
                        <Button className='pb-2 text-sm font-normal text-center items-start' variant='h7' >Blog</Button>
                    </div>
                    <div>
                        <Button className='pb-2 text-sm font-normal text-center items-start' variant='h7' >Press</Button>
                    </div>
                    <div>
                        <Button className='pb-2 text-sm font-normal text-center items-start' variant='h7' >Jobs</Button>
                    </div>
                    <div>
                        <Button className='pb-2 text-sm font-normal text-center items-start' variant='h7' >Partners</Button>
                    </div>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <Typography className='pb-3 ' variant='h6'>Solutions</Typography>
                    <div>
                        <Button className='pb-2 text-sm font-normal text-center items-start' variant='h7' >Marketing</Button>
                    </div>
                    <div>
                        <Button className='pb-2 text-sm font-normal text-center items-start' variant='h7' >Analytics</Button>
                    </div>
                    <div>
                        <Button className='pb-2 text-sm font-normal text-center items-start' variant='h7' >Commerce</Button>
                    </div>
                    <div>
                        <Button className='pb-2 text-sm font-normal text-center items-start' variant='h7' >Insights</Button>
                    </div>
                    <div>
                        <Button className='pb-2 text-sm font-normal text-center items-start' variant='h7' >Support</Button>
                    </div>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <Typography className='pb-3 ' variant='h6'>Documentation</Typography>
                    <div>
                        <Button className='pb-2 text-sm font-normal text-center items-start' variant='h7' >Guides</Button>
                    </div>
                    <div>
                        <Button className='pb-2 text-sm font-normal text-center items-start' variant='h7' >API Status</Button>
                    </div>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <Typography className='pb-3 ' variant='h6'>Legal</Typography>
                    <div>
                        <Button className='pb-2 text-sm font-normal text-center items-start' variant='h7' >Privacy</Button>
                    </div>
                    <div>
                        <Button className='pb-2 text-sm font-normal text-center items-start' variant='h7' >Claim</Button>
                    </div>
                    <div>
                        <Button className='pb-2 text-sm font-normal text-center items-start' variant='h7' >Terms</Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Footer
