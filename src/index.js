/* @jsx jsx */
import {jsx, css, Global} from '@emotion/core'

import React, {useRef, useState, useEffect} from 'react'
import ReactDOM from 'react-dom'

function App() {
  const audioRef = useRef()
  const [audioSrc, setAudioSrc] = useState()
  const [playbackRate, setPlaybackRate] = useState(1)
  useEffect(
    () => {
      if (!audioRef.current) {
        return
      }
      audioRef.current.playbackRate = playbackRate
    },
    [playbackRate],
  )

  return (
    <div>
      <Global
        styles={css`
          body {
            font-family: 'Squada One', cursive;
          }
        `}
      />
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContents: 'center',
        }}
      >
        <h1>
          Audio Speeder{' '}
          <span
            role="img"
            aria-label="race car with a puff of smoke behind it"
            css={{display: 'inline-block', transform: 'scaleX(-1)'}}
          >
            🏎💨
          </span>
        </h1>

        <input
          type="text"
          onChange={e => setAudioSrc(e.target.value)}
          css={{
            lineHeight: 2,
            fontSize: '1.2rem',
            padding: '6px 14px',
            borderRadius: 4,
            border: '2px solid #1d1075',
          }}
        />
        {audioSrc ? (
          <>
            <input
              type="range"
              min={0}
              max={5}
              step="0.1"
              defaultValue={playbackRate}
              onChange={e => setPlaybackRate(e.target.value)}
            />
            <div>Playback Rate: {playbackRate}</div>
            <audio
              controls={true}
              css={{width: '100%'}}
              ref={audioRef}
              src={audioSrc}
            />
          </>
        ) : null}
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
