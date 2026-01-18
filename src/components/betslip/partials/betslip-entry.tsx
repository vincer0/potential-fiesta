'use client';
import { Event } from '@/types/event';
import React from 'react'

interface BetslipEntryProps {
    eventEntry: EventEntry; // TODO: define EventEntry type
}

const BetslipEntry = () => {
  return (
    <div>
        <div className="flex flex-col">
            <div className="flex">
                <p>Selection Name</p>
                <p>XX.XX</p>
                <button>Delete</button>
            </div>
            <div>
                <p>Market Group Name</p>
            </div>
        </div>
        <hr />
        <div className="flex flex-col">
            <p>Nazwa eventu</p>
            <div className="flex justify-between">
                <p>Sport - Kraj - Turniej</p>
                <p>Data i godzina</p>
            </div>
        </div>
    </div>
  )
}

export default BetslipEntry